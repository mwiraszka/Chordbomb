import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Song } from '../../shared/song.model';
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

  private songSub: Subscription;
  songData!: Song

  songForm!: FormGroup;

  constructor(
    private songService: SongService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    // Subscribe to user-selected song through private song service and store song data
    // locally to be able to populate the form in this component
    this.songSub = this.songService.selectedSong.subscribe((song) => {
      this.songData = song;
    });
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.songSub.unsubscribe();
  }

  // Set control names and validators for each of the form's fields
  private initForm() {
    this.songForm = this.fb.group({
      // editionTimestamp: [],  // field hidden from form; automatically added on submission
      // editionAuthor: ['', [Validators.required, Validators.pattern(/Michal/)]],
      // editionNote: ['', Validators.required],
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
      nodes: this.fb.array([])
    });
  }

  addNode() {
    console.log('adding new node')
    let nodeArray = this.songForm.controls.nodes as FormArray;
    const newNode: FormGroup = this.fb.group({
      timeMarker: [
        '',
        Validators.required,
        Validators.pattern(/^\d{1-3}-\d{1-2}-[1-4]$/)
      ],
      bpm: ['', [Validators.min(40), Validators.max(250)]],
      chord: ['', Validators.maxLength(6)],
      lyric: ['', Validators.pattern(/w-/)],
      label: ['']
    });

    nodeArray.push(newNode);
  }

  removeNode(index: number) {
    console.log('removing index ' + index)
    let nodeArray = this.songForm.controls.nodes as FormArray;
    nodeArray.removeAt(index);
  }

  isEditMode() {
    return this.songService.editMode;
  }

  onAddNewSong() {
    this.songService.selectSong(new Song());
    this.songService.editMode = false;
  }

  onSubmit() {
    const timestamp = new Date(Date.now());

    if (this.songService.editMode) {
      this.songService.updateSong(this.songData.id, this.songForm.value);
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
