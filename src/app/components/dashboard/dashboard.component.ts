import { Component } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { SettingsService } from '@app/shared/services/settings.service';
import { SongService } from '@app/shared/services/song.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  faCog = faCog;

  fontSizes: string[] = ['regular', 'large'];
  chordTypes: string[] = ['full', 'basic', 'none'];

  fontSizeSub!: Subscription;
  chordTypeSub!: Subscription;
  isSongToDisplaySub!: Subscription;
  fontSize!: string;
  chordType!: string;
  isSongToDisplay!: boolean;

  constructor(
    private songService: SongService,
    private settingsService: SettingsService,
    private toastr: ToastrService
  ) {
    this.isSongToDisplaySub = this.songService.isSongToDisplay.subscribe((value) => {
      this.isSongToDisplay = value;
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
    this.fontSizeSub.unsubscribe();
    this.chordTypeSub.unsubscribe();
  }

  onSettingChange($event: any): void {
    switch($event.source.name) {
      case('fontSize'):
        this.settingsService.changeFontSize($event.value);
        break;
      case('chordType'):
        this.settingsService.changeChordType($event.value);
        break;
      default:
        this.toastr.error('Error changing settings', 'Oops!',
          { positionClass: 'toast-bottom-right' }
        );
    }
  }
}
