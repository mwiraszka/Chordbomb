import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SongService } from '@app/shared/services/song.service';
import { SettingsService } from '@app/shared/services/settings.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav [opened]="isSidenavOpen">
        <app-sidenav></app-sidenav>
      </mat-sidenav>
      <mat-sidenav-content>
        <main id="main-content">
          <app-song-search *ngIf="!isSongToDisplay"></app-song-search>
          <app-song-display *ngIf="isSongToDisplay"></app-song-display>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class DashboardComponent implements OnInit, OnDestroy {
  /*
   * Subscription to isSongToDisplay, with boolean values emitted from song service
   * whenever a song has been selected, reflecting change in isSongToDisplay local
   * variable, which in turn displays either the search or display component using the
   * ngIf directive in the template
   */
  isSongToDisplaySub!: Subscription;
  isSongToDisplay!: boolean;

  /*
   * Subscription to the subject in the settings service reflecting a click event on
   * 'Settings' in top nav bar; initialize local variable isSidenavOpen as false so that
   * every time a new dashboard instance is created (and no value has yet been emitted by
   * the subject), the sidenav remains closed by default while waiting for the first event
   * emission
   */
  sidenavToggleSub!: Subscription;
  isSidenavOpen = false;

  constructor(
    private songService: SongService,
    private settingsService: SettingsService
  ) {
    this.isSongToDisplaySub = this.songService.isSongToDisplay.subscribe((value) => {
      this.isSongToDisplay = value;
    });
    this.sidenavToggleSub = this.settingsService.sidenavStatus.subscribe(() => {
      this.isSidenavOpen = !this.isSidenavOpen;
    })
  }

  ngOnInit() {
    document.getElementById('nav-settings-btn')?.classList.remove('hide');
  }

  /* Unsubscribe on destroying component to avoid memory leaks */
  ngOnDestroy() {
    this.isSongToDisplaySub.unsubscribe();
    this.sidenavToggleSub.unsubscribe();
  }
}
