import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { SettingsService } from '@app/shared/services/settings.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent {
  fontSizes: string[] = ['regular', 'large'];
  chordTypes: string[] = ['full', 'basic', 'none'];

  fontSizeSub!: Subscription;
  chordTypeSub!: Subscription;
  fontSize!: string;
  chordType!: string;

  constructor(private settingsService: SettingsService, private toastr: ToastrService) {
    this.fontSizeSub = this.settingsService.fontSize$.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });
    this.chordTypeSub = this.settingsService.chordType$.subscribe((chordType) => {
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
        this.settingsService.setFontSize($event.value);
        break;
      case('chordType'):
        this.settingsService.setChordType($event.value);
        break;
      default:
        this.toastr.error('Error changing settings', 'Oops!',
          { positionClass: 'toast-bottom-right' }
        );
    }
  }
}
