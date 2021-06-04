import { Component } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { SettingsService } from '@app/shared/services/settings.service';
import { SongService } from '@app/shared/services/song.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent {
  faCog = faCog;

  fontSizes: string[] = ['regular', 'large'];
  chordTypes: string[] = ['full', 'basic', 'none'];

  fontSizeSub!: Subscription;
  chordTypeSub!: Subscription;
  fontSize!: string;
  chordType!: string;

  constructor(private settingsService: SettingsService, private toastr: ToastrService) {
    this.fontSizeSub = this.settingsService.fontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });
    this.chordTypeSub = this.settingsService.chordType.subscribe((chordType) => {
      this.chordType = chordType;
    });
  }

  /* Unsubscribe on destroying component to avoid memory leaks */
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
