import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SongService } from '@app/shared/services/song.service';
import { SettingsService } from '@app/shared/services/settings.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <mat-sidenav-container id="dashboard-container">
      <app-song-search *ngIf="!isSongToDisplay"></app-song-search>
      <app-song-display *ngIf="isSongToDisplay"></app-song-display>
      <mat-sidenav #sidenav mode="side" position="end" [opened]="openSidenav">
        <app-sidenav></app-sidenav>
      </mat-sidenav>
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
   * Subscription to the behavior subject in Settings Service reflecting a click event on
   * top nav bar 'Settings' button
   */
  openSidenavSub!: Subscription;
  openSidenav!: boolean;

  constructor(
    private songService: SongService,
    private settingsService: SettingsService
  ) {
    this.isSongToDisplaySub = this.songService.isSongDisplay.subscribe((value) => {
      /*
       * Update local variable and reflect change in style of cursor in nav bar when
       * hovering over Song Search
       */
      this.isSongToDisplay = value;
      const navLink = document.getElementById('song-search-nav-link');
      this.isSongToDisplay ?
        navLink?.classList.add('displaying-song') :
        navLink?.classList.remove('displaying-song');
    });
    this.openSidenavSub = this.settingsService.isSidenavOpen.subscribe((value) => {
      this.openSidenav = value;
    })
  }

  ngOnInit() {
    document.getElementById('nav-settings-btn')?.classList.remove('hide');
  }

  /* Unsubscribe on destroying component to avoid memory leaks */
  ngOnDestroy() {
    this.isSongToDisplaySub.unsubscribe();
    this.openSidenavSub.unsubscribe();
  }
}
