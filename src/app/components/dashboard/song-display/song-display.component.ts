import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Song } from '@app/shared/models/song.model';
import { SettingsService } from '@app/shared/services/settings.service';
import { SongService } from '@app/shared/services/song.service';

@Component({
  selector: 'app-song-display',
  templateUrl: './song-display.component.html'
})
export class SongDisplayComponent implements OnDestroy {
  songSub!: Subscription;
  fontSizeSub!: Subscription;
  chordTypeSub!: Subscription;

  /*
   * Local variable for displayed song, and a convenience alias variable for song's final
   * node's timeMarker
   */
  song!: Song | null;
  lastMarker!: string;

  /*
   * Internal 'label' flags, not meant to be displayed to user:
   * n - new line; i - instrumental section; e - end; f - fade-out
   */
  internalFlags = ['n', 'i', 'ni', 'e', 'ef'];

  /* Local variables for user-selected settings from sidenav */
  fontSize!: string;
  chordType!: string;

  constructor(
    private songService: SongService,
    private settingsService: SettingsService
  ) {
    this.songSub = this.songService.songToDisplay$.subscribe((song) => {
      this.song = song;
      this.lastMarker = this.song?.nodes.slice(-1)[0].timeMarker;
    });

    this.fontSizeSub = this.settingsService.fontSize$.subscribe((fontSize) => {
      this.fontSize = fontSize;
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

  /* Removing the song in Song Service will trigger a return to the Search component */
  onNextSong() {
    this.songService.removeSongToDisplay();
  }
}
