import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { SongService } from '@app/_services/song.service';
import { Song } from '@app/_models/song.model';

@Component({ selector: 'app-song-edit', templateUrl: './song-edit.component.html' })
export class SongEditComponent implements OnDestroy {
  selectedSongSub!: Subscription;
  selectedSong!: Song;

  constructor(
    public songService: SongService,
    private toastr: ToastrService
  ) {
    // Populate form with selected song's data; if no song selected, use default values
    // from song model
    this.selectedSongSub = this.songService.getSelectedSong().subscribe(song => {
      this.selectedSong = song ? song : new Song();
    })
  }

  ngOnDestroy() {
    this.selectedSongSub.unsubscribe();
  }

  onNewEntry() {
    this.songService.clearSelectedSong();
    this.songService.editMode = false;
  }

  onSubmit(form: NgForm) {
    const song = Object.assign({}, form.value);
    if (this.songService.editMode) {
      // Retain original song ID in database
      delete song.id;
      this.songService.updateSong(form.value.id, song)
      this.toastr.success('Changes saved', `${song.artists} - ${song.title}`, {
        positionClass: 'toast-bottom-right'
      })
    } else {
      this.songService.addSong(song)
      this.toastr.success('Added to database', `${song.artists} - ${song.title}`, {
        positionClass: 'toast-bottom-right'
      });
    }
  }
}
