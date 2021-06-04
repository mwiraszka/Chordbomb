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

  songToDisplaySub!: Subscription;
  fontSizeSub!: Subscription;
  chordTypeSub!: Subscription;

  song!: Song | null;
  fontSize!: number;
  chordType!: string;

  constructor(
    private songService: SongService,
    private settingsService: SettingsService,
    private toastr: ToastrService
  ) {
    this.songToDisplaySub = this.songService.songToDisplay.subscribe((song) => {
      this.song = song;
    });
    this.fontSizeSub = this.settingsService.fontSize.subscribe((fontSize) => {
      switch(fontSize) {
        case ('regular'):
          this.fontSize = 12;
          break;
        case ('large'):
          this.fontSize = 20;
          break;
        default:
          this.fontSize = 12;
          this.toastr.warning('Could not load preferred font size', 'Oops!', {
            positionClass: 'toast-bottom-right'
          });
      }
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

  onNewSong() {
    this.songService.setSongDisplay(false);
  }
}
