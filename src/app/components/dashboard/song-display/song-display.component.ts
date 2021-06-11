import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Song } from '@app/shared/models/song.model';
import { SettingsService } from '@app/shared/services/settings.service';
import { SongService } from '@app/shared/services/song.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-song-display',
  templateUrl: './song-display.component.html'
})
export class SongDisplayComponent implements OnDestroy {
  songSub!: Subscription;
  fontSizeSub!: Subscription;
  chordTypeSub!: Subscription;

  song!: Song | null;
  lastMarker!: string; // Alias for song's final time marker
  largeFont!: boolean;
  chordType!: string;

  constructor(
    private songService: SongService,
    private settingsService: SettingsService,
    private toastr: ToastrService
  ) {
    this.songSub = this.songService.songToDisplay$.subscribe((song) => {
      this.song = song;
      this.lastMarker = this.song?.nodes.slice(-1)[0].timeMarker;
    });

    this.fontSizeSub = this.settingsService.fontSize$.subscribe((fontSize) => {
      this.updateFontSize(fontSize);
    });

    this.chordTypeSub = this.settingsService.chordType$.subscribe((chordType) => {
      this.chordType = chordType;
    });
  }

  /* Unsubscribe for all subs on destroying component to avoid memory leaks */
  ngOnDestroy() {
    this.songSub.unsubscribe();
    this.fontSizeSub.unsubscribe();
    this.chordTypeSub.unsubscribe();
  }

  onNextSong() {
    this.songService.removeSongToDisplay();
  }

  updateFontSize(newFontSize: string): void {
    this.largeFont = newFontSize==='large' ? true : false;
    if (newFontSize !=='regular' && newFontSize !=='large') {
      this.toastr.error('Could not load preferred font size', 'Oops!', {
        positionClass: 'toast-bottom-right'
      });
    };
  }
}
