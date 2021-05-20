import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Song } from '../../shared/song.model';
import { SongService } from '../../shared/song.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnDestroy {
  // Get song that user selected from displayed song list
  private selectedSongSub: Subscription;
  selectedSong!: Song;

  // Set control names and validators for each of the form's fields
  songForm = this.formBuilder.group({
    editions: this.formBuilder.group({
      timestamp: [
        {
          value: new Date(Date.now()),
          disabled: true
        }
      ],
      author: ['', [Validators.required, Validators.pattern(/Michal/)]]
    }),
    artists: ['', Validators.required],
    songTitle: ['', Validators.required],
    albumTitle: [''],
    albumYear: ['', [Validators.min(1700), Validators.max(2021)]],
    albumArtworkLink: [''],
    songwriters: [''],
    producers: [''],
    publishers: [''],
    timeSignature: ['', Validators.required],
    originalKey: ['', Validators.required],
    node: this.formBuilder.array([
      this.formBuilder.group({
        timeMarker: [
          '',
          Validators.required,
          Validators.pattern(/^\d{1-3}-\d{1-2}-[1-4]$/)
        ],
        bpm: ['', [Validators.min(40), Validators.max(250)]],
        chord: ['', Validators.maxLength(6)],
        lyric: ['', Validators.pattern(/w-/)],
        label: ['']
      })
    ])
  });

  constructor(
    public songService: SongService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    // Populate form with selected song's data; if no song selected, use default values
    // from song model by instantiating new song-type
    this.selectedSongSub = this.songService.getSelectedSong().subscribe((song) => {
      this.selectedSong = song ? song : new Song();
    });
  }

  ngOnDestroy() {
    this.selectedSongSub.unsubscribe();
  }

  onAddNewSong() {
    this.songService.clearSelectedSong();
    this.songService.editMode = false;
  }

  onSubmit() {
    if (this.songService.editMode) {
      this.songService.updateSong(this.selectedSong.id, this.songForm.value);
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
