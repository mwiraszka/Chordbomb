import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '@app/shared/services/sidenav.service';
import { SettingsService } from '@app/shared/services/settings.service';
import { SongService } from '@app/shared/services/song.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  /* Lists of options for each setting, and subscriptions to the currently selected one */
  fontSizes: string[] = ['regular', 'large'];
  chordTypes: string[] = ['full', 'basic', 'none'];

  fontSizeSub!: Subscription;
  chordTypeSub!: Subscription;
  fontSize!: string;
  chordType!: string;

  /*
   * Subscription to isSongToDisplay which emits a song-type whenever a song has been
   * selected, and null otherwise
   */
  displaySub!: Subscription;
  isSongToDisplay!: boolean;

  /*
   * When 'Settings' is clicked in top nav bar, subject in SidenavService emits void which
   * is observed by this component, triggering sidenav.toggle(), linked to the nested
   * mat-sidenav element through the @ViewChild decorator
   */
  sidenavOpenSub!: Subscription;
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  /*
   * Subscribe to all necessary observables, storing each subscription in a dedicated
   * 'sub' variable, and move to local variables to be able to use them in the template
   */
  constructor(
    private settingsService: SettingsService,
    private sidenavService: SidenavService,
    private songService: SongService,
    private toastr: ToastrService
  ) {
    this.displaySub = this.songService.songToDisplay$.subscribe((song) => {
      this.whatToDisplay(!!song);
    });

    this.sidenavOpenSub = this.sidenavService.openSidenav$.subscribe(() => {
      this.sidenav.toggle();
    });

    this.fontSizeSub = this.settingsService.fontSize$.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.chordTypeSub = this.settingsService.chordType$.subscribe((chordType) => {
      this.chordType = chordType;
    });
  }

  /*
   * App settings are only applicable to Dashboard components, so make them available upon
   * initiating the dashboard by unhiding the button in the nav bar
   */
  ngOnInit() {
    document.getElementById('nav-settings-btn')?.classList.remove('hide');
  }

  /* Unsubscribe from all subscriptions on destroying component to avoid memory leaks */
  ngOnDestroy() {
    this.displaySub.unsubscribe();
    this.fontSizeSub.unsubscribe();
    this.chordTypeSub.unsubscribe();
  }

  /*
   * Update local variable and change style of cursor when hovering over Song Search in
   * the nav bar
   */
  whatToDisplay(isSongSelected: boolean) {
    this.isSongToDisplay = isSongSelected;
    const navLink = document.getElementById('song-search-nav-link');
    this.isSongToDisplay ?
      navLink?.classList.add('displaying-song') :
      navLink?.classList.remove('displaying-song');
  }

  /* Use metadata passed in $event to determine what to do with the click event */
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
    };
  }
}
