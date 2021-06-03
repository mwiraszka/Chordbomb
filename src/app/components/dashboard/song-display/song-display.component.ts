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

  songToDisplaySub!: Subscription;
  fontSizeSub!: Subscription;
  chordTypeSub!: Subscription;

  song!: Song | null;
  fontSize!: string;
  chordType!: string;

  constructor(
    private songService: SongService,
    private settingsService: SettingsService
  ) {
    this.songToDisplaySub = this.songService.songToDisplay.subscribe((song) => {
      this.song = song;
    });
    this.fontSizeSub = this.settingsService.fontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });
    this.chordTypeSub = this.settingsService.chordType.subscribe((chordType) => {
      this.chordType = chordType;
    });
  }

  /* Unsubscribe on leaving component to avoid memory leaks */
  ngOnDestroy() {
    this.songToDisplaySub.unsubscribe();
    this.fontSizeSub.unsubscribe();
    this.chordTypeSub.unsubscribe();
  }
}
