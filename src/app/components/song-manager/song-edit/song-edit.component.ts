import { formatDate } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Edition } from '@app/shared/models/edition.model';
import { Node } from '@app/shared/models/node.model';
import { Song } from '@app/shared/models/song.model';
import { SongService } from '@app/shared/services/song.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html'
})
export class SongEditComponent implements OnDestroy {
  /* Declare Font Awesome icons */
  faPlus = faPlus;
  faMinus = faMinus;

  /*
   * Inject necessary services, subscribe to the user-selected song from song list &
   * initialize form
   */
  private songSub: Subscription;
  song!: Song;
  songForm!: FormGroup;

  constructor(
    private songService: SongService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.songSub = this.songService.songToEdit$.subscribe((song) => {
      this.song = song;
      this.newForm();
    });
  }

  /* Unsubscribe on destroy to avoid any memory leaks */
  ngOnDestroy() {
    this.songSub.unsubscribe();
  }

  /* Edit mode affects button text and how the form is eventually submitted */
  isEditMode() {
    return this.songService.editMode;
  }

  /* Song and edit mode updated in service, and change is reflected in the form */
  onCreateNewSong() {
    this.songService.setSongToEdit(new Song());
    this.songService.editMode = false;
    this.newForm();
  }

  /* Form is initialized and validators defined for each control */
  newForm() {
    this.songForm = this.formBuilder.group({
      newEdition: this.formBuilder.group({
        timestamp: [''], // Not displayed to user
        author: ['Michal', [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern(/^Michal$/)
        ]],
        note: ['', [Validators.required, Validators.maxLength(200)]]
      }),
      artists: [this.song.artists, [Validators.required, Validators.maxLength(100)]],
      title: [this.song.title, [Validators.required, Validators.maxLength(100)]],
      album: [this.song.album, [Validators.required, Validators.maxLength(100)]],
      albumYear: [this.song.albumYear, [
        Validators.maxLength(4),
        Validators.pattern(/^[0-9]*$/),
        Validators.min(1700),
        Validators.max(2021)
      ]],
      albumCoverLink: [this.song.albumCoverLink, Validators.maxLength(200)],
      songwriters: [this.song.songwriters, Validators.maxLength(200)],
      producers: [this.song.producers, Validators.maxLength(200)],
      publishers: [this.song.publishers, Validators.maxLength(200)],
      primaryKey: [this.song.primaryKey, [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(
          /^(C|C#|Db|D|D#|Eb|E|F|F#|Gb|G|G#|Ab|A|A#|Bb|B) (M|m)(ajor|inor)$/
        )
      ]],
      primaryTimeSig: [this.song.primaryTimeSig, [
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern(
          /^(2|3|4|5|6|7|9|10|11|12|13|14|15|17)\/(2|4|8|16)$/
        )
      ]],
      songDuration: [this.song.songDuration, [
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern(/^\d{1,2}:(0|1|2|3|4|5)\d$/)
      ]],
      nodes: this.getNodeFormArray()
    });
  }

  /* Return a form array with enough elements to fit all the selected song's nodes */
  getNodeFormArray(): FormArray {
    let nodeFormArray: FormArray = new FormArray([]);
    for (let i = 0; i < this.song.nodes.length; i++) {
      nodeFormArray.push(this.newNodeFormGroup());
    }
    return nodeFormArray;
  }

  /*
   * Build node form group, with empty initial values and all validators in place;
   * each of these node form groups is an element in the node form array
   * 1 - Time marker must be three numbers, separated by dashes: (0-999) - (1-17) - (1-4)
   * 2 - Valid regex pattern for chord includes letters, sharps, flats included as a 'b',
   *     5-7-9 (as superscripts), dim, aug, sus2, sus4, M (major), slash (inversions)
   */
  newNodeFormGroup(): FormGroup {
    return this.formBuilder.group({
      timeMarker: ['', [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(
          /^\d{1,3}-(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17)-(1|2|3|4)$/ /* 1 */
        )
      ]],
      bpm: ['', [
        Validators.maxLength(3),
        Validators.pattern(/^[0-9]*$/),
        Validators.min(40),
        Validators.max(300)
      ]],
      chord: ['', [
        Validators.maxLength(10),
        Validators.pattern(/^[abcdefgABCDEFG#5791iMmus24\/]*$/) /* 2 */
      ]],
      lyric: ['', Validators.maxLength(12)],
      label: ['', Validators.maxLength(12)]
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

  /*
   * Insert a new node form group directly after row of clicked button (so, index + 1);
   * this means a new group of controls is added to the overall song form group, and
   * also that all nodes in the song data node array need to be shifted by one
   */
  insertNode(index: number): void {
    this.nodes.insert(index + 1, this.newNodeFormGroup());
    this.song.nodes.splice(index + 1, 0, new Node());
  }

  /*
   * Ensure at least one row is always present; again, reflect the change in both the
   * displayed form (removing a node form group from the song form) and in the song data
   * (splicing the item out of the node array)
   */
  removeNode(index: number): void {
    if (this.nodes.length > 1) {
      this.nodes.removeAt(index);
      this.song.nodes.splice(index, 1);
    }
  }

  onSubmit() {
    /* Add current time as edition timestamp value */
    const timestamp = formatDate(new Date(Date.now()), 'd MMMM yyyy, h:mm a', 'en-US');
    this.songForm.patchValue({'newEdition': {
      timestamp: timestamp
    }});

    /* Copy form data over to new variable and add previous edition information back in */
    let formData = { ...this.songForm.value };
    formData.editions = [...this.song.editions, this.songForm.value.newEdition];

    /*
     * Destructure form data variable to remove new edition variable and retain only
     * song-type parameters (songData)
     */
    const { newEdition, ...songData } = formData;

    /* Convert custom objects used in project to JS objects */
    songData.editions = songData.editions.map((obj: any) => {
      return Object.assign({}, obj)
    });
    songData.nodes = songData.nodes.map((obj: any) => {
      return Object.assign({}, obj)
    });

    /*
     * Pass completed song data to Song Service's update() or add() method, depending on
     * edit mode; if was in add mode, switch to edit mode to allow for further editing
     */
    if (this.songService.editMode) {
      if (this.song.id != null) {
        this.songService.updateSong(this.song.id, songData, timestamp);
        this.toastr.success('Changes saved', `${songData.artists} - ${songData.title}`,
          { positionClass: 'toast-bottom-right' }
        );
      } else {
        this.toastr.warning('Oops! Could not locate',
        `${songData.artists} - ${songData.title}`,
          { positionClass: 'toast-bottom-right' }
        );
      }
    } else {
      this.songService.addSong(songData, timestamp);
      this.toastr.success('Successfully added', `${songData.artists} - ${songData.title}`,
        { positionClass: 'toast-bottom-right' }
      );
      this.songService.editMode = true;
    }
  }
}
