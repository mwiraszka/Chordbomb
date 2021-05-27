import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Edition, Node, Song } from '../../shared/song.model';
import { SongService } from '../../shared/song.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit, OnDestroy {
  /* Font Awesome icons */
  faPlus = faPlus;
  faMinus = faMinus;

  /* Subscribe to the user-selected song from song list & initialize form */
  private songSub: Subscription;
  song!: Song;

  songForm!: FormGroup;

  constructor(
    private songService: SongService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.songSub = this.songService.songToEdit.subscribe((song) => {
      this.song = song;
      this.newForm();
    });
  }

  ngOnInit() {
    this.newForm();
  }

  /* Unsubscribe on destroy to avoid memory leaks */
  ngOnDestroy() {
    this.songSub.unsubscribe();
  }

  /* Edit mode affects button text and how the form is eventually submitted */
  isEditMode() {
    return this.songService.editMode;
  }

  /* Song and edit mode updated in service, and change is reflected in the form */
  onCreateNewSong() {
    this.songService.changeSongToEdit(new Song());
    this.songService.editMode = false;
    this.newForm();
  }

  /* Form is initialized to empty values and validators defined for each control */
  newForm() {
    this.songForm = this.formBuilder.group({
      id: [this.song.id], // not displayed to user
      backup: [''], // not displayed to user
      newEdition: this.formBuilder.group({
        timestamp: [''], // not displayed to user
        author: ['Michal', [
          Validators.required,
          Validators.pattern(/^Michal$/)
        ]],
        note: ['', Validators.required]
      }),
      artists: ['', Validators.required],
      title: ['', Validators.required],
      album: ['', Validators.required],
      albumYear: ['', [
        Validators.pattern(/^[0-9]*$/),
        Validators.min(1700),
        Validators.max(2021)
      ]],
      albumCoverLink: [''],
      songwriters: [''],
      producers: [''],
      publishers: [''],
      timeSignature: ['', [
          Validators.required,
          Validators.pattern(/^(2|3|4|5|6|7|9|10|11|12|13|14|15|17)\/(2|4|8|16)$/)
      ]],
      key: ['', [
          Validators.required,
          Validators.pattern(
            /^(C|C#|Db|D|D#|Eb|E|F|F#|Gb|G|G#|Ab|A|A#|Bb|B) (M|m)(ajor|inor)$/
          )
      ]],
      nodes: this.getNodeFormArray()
    });
  }

  getNodeFormArray(): FormArray {
    let nodeFormArray: FormArray = new FormArray([]);
    for (let i = 0; i < this.song.nodes.length; i++) {
      nodeFormArray.push(this.newNodeFormGroup());
    }
    return nodeFormArray;
  }

  newNodeFormGroup(): FormGroup {
    return this.formBuilder.group({
      timeMarker: ['', [
        Validators.required,
        Validators.pattern(
          /^\d{1,3}-(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17)-(1|2|3|4)$/
        )
      ]],
      bpm: ['', [
        Validators.pattern(/^[0-9]*$/),
        Validators.min(40),
        Validators.max(300)
      ]],
      chord: ['',
        Validators.pattern(/^[abcdefgABCDEFG#5791imus\/]+$/)
      ], // letters, sharp, flat included as a 'b', superscripts, dim, aug, sus, slash
      lyric: [''], // all inputs allowed for now
      label: ['']
    });
  }

  /* Convenience getters to keep code cleaner, particularly with validation in template */
  get f() {
    return this.songForm.controls;
  }

  get ed() {
    return (<FormGroup>this.songForm.controls['newEdition']).controls;
  }

  get nodes(): FormArray {
    return <FormArray>this.songForm.controls['nodes'];
  }

  get latestEd(): Edition {
    return this.song.editions.slice(-1)[0];
  }

  timeMarker(index: number): AbstractControl {
    return (<FormGroup>this.nodes.controls[index]).controls['timeMarker'];
  }

  bpm(index: number): AbstractControl {
    return (<FormGroup>this.nodes.controls[index]).controls['bpm'];
  }

  chord(index: number): AbstractControl {
    return (<FormGroup>this.nodes.controls[index]).controls['chord'];
  }

  label(index: number): AbstractControl {
    return (<FormGroup>this.nodes.controls[index]).controls['label'];
  }

  /* Insert a new node row directly after the row of the clicked button (so index + 1);
  this means a new group of controls is added to the overall song form group, and
  also that all nodes in the song data node array need to be shifted by one */
  insertNodeFormGroup(index: number): void {
    this.nodes.insert(index + 1, this.newNodeFormGroup());
    this.song.nodes.splice(index + 1, 0, new Node());
  }

  /* Ensure at least one row is always present; again, reflect the change in both the
  displayed form (removing a node form group from the song form) and in the song data
  (splicing the item out of the node array) */
  removeNodeFormGroup(index: number): void {
    if (this.nodes.length > 1) {
      this.nodes.removeAt(index);
      this.song.nodes.splice(index, 1);
    }
  }

  /* Compile all song form data and additional data such as timestamp, and  */
  onSubmit() {
    // Get submission date and time and use as edition timestamp value
    this.songForm.patchValue({'newEdition': {
      timestamp: new Date(Date.now()).toLocaleString()
    }});

    // Copy form data over to variable and add previous edition information back in
    let formData = { ...this.songForm.value };
    formData.editions = [...this.song.editions, this.songForm.value.newEdition];

    // Destructure form data variable to remove new edition variable and retain only
    // song-type parameters (songData)
    const { newEdition, ...songData } = formData;

    // Convert custom objects used in project to JS objects
    songData.editions = songData.editions.map((obj: any) => {
      return Object.assign({}, obj)
    });
    songData.nodes = songData.nodes.map((obj: any) => {
      return Object.assign({}, obj)
    });

    // Pass completed song data to service's update or add method depending on edit mode
    if (this.songService.editMode) {
      // Save stringified pre-edit version as a backup
      this.song.backup = '';
      songData.backup = JSON.stringify(this.song);

      this.songService.updateSong(songData);
      this.toastr.success(
        'Successfully updated',
        `${songData.artists} - ${songData.title}`,
        { positionClass: 'toast-bottom-right' }
      );
    } else {
      this.songService.addSong(songData);
      this.toastr.success(
        'Successfully added',
        `${songData.artists} - ${songData.title}`,
        { positionClass: 'toast-bottom-right' }
      );
    }

    this.onCreateNewSong(); // simultaneously reset song data and form
  }
}