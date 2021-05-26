import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Node, Song } from '../../shared/song.model';
import { SongService } from '../../shared/song.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit, OnDestroy {
  // Font Awesome icons
  faPlus = faPlus;
  faMinus = faMinus;

  // Subscription to the user-selected song from song list
  private songSub: Subscription;
  song!: Song;

  songForm!: FormGroup;

  constructor(
    private songService: SongService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.songSub = this.songService.selectedSong.subscribe((song) => {
      this.song = song;
      this.resetForm();
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  ngOnDestroy() {
    this.songSub.unsubscribe();
  }

  resetForm() {
    this.songForm = this.formBuilder.group({
      editionTimestamp: [],
      editionAuthor: ['Michal', [Validators.required, Validators.pattern(/Michal/)]],
      editionNote: ['', Validators.required],
      artists: [Validators.required],
      title: [Validators.required],
      album: [],
      albumYear: [[Validators.min(1700), Validators.max(2021)]],
      albumCoverLink: [],
      songwriters: [],
      producers: [],
      publishers: [],
      timeSignature: [Validators.required],
      originalKey: [Validators.required],
      nodes: this.getNodeFormArray()
    });
  }

  getNodeFormArray(): FormArray {
    let nodeFormArray: FormArray = new FormArray([]);
    for (let i = 0; i < this.song.nodes.length; i++) {
      nodeFormArray.push(this.getNodeFormGroup());
    }
    return nodeFormArray;
  }

  getNodeFormGroup(): FormGroup {
    return this.formBuilder.group({
      timeMarker: ['1', [Validators.required, Validators.pattern(/^\d{1-3}-\d{1-2}-[1-4]$/)]],
      bpm: ['2', [Validators.min(40), Validators.max(250)]],
      chord: ['3', Validators.maxLength(6)],
      lyric: ['4', Validators.pattern(/w-/)],
      label: ['5']
    });
  }

  get nodeArray(): FormArray {
    return (<FormArray>this.songForm.get('nodes'));
  }

  insertNodeFormGroup(index: number): void {
    // Insert a new node row directly after the row of the clicked button (so index + 1);
    // this means a new group of controls is added to the overall song form group, and
    // also that all nodes in the song data node array need to be shifted by one
    this.nodeArray.insert(index + 1, this.getNodeFormGroup());
    this.song.nodes.splice(index + 1, 0, new Node());
  }

  removeNodeFormGroup(index: number): void {
    // Ensure at least one row is always present; again, reflect the change in both the
    // displayed form (removing a node form group from the song form) and in the song data
    // (splicing the item out of the node array)
    if (this.nodeArray.length > 1) {
      this.nodeArray.removeAt(index);
      this.song.nodes.splice(index, 1);
    }
  }

  isEditMode() {
    return this.songService.editMode;
  }

  onCreateNewSong() {
    this.songService.selectSong(new Song());
    this.resetForm();
    this.songService.editMode = false;
  }

  onSubmit() {
    if (this.songService.editMode) {
      this.songService.updateSong(this.song.id, this.songForm.value);
      this.toastr.success(
        'Changes saved',
        `${this.songForm.value.artists} - ${this.songForm.value.title}`,
        {
          positionClass: 'toast-bottom-right'
        }
      );
    } else {
      this.songService.addSong(this.songForm.value);
      this.toastr.success(
        'Added to database',
        `${this.songForm.value.artists} - ${this.songForm.value.title}`,
        {
          positionClass: 'toast-bottom-right'
        }
      );
    }
  }
}
