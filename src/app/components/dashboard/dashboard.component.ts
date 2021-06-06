import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { SidenavService } from '@app/shared/services/sidenav.service';
import { SongService } from '@app/shared/services/song.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  template: `
    <mat-sidenav-container id="dashboard-container">
      <app-song-search *ngIf="!isSongToDisplay"></app-song-search>
      <app-song-display *ngIf="isSongToDisplay"></app-song-display>
      <mat-sidenav
        #sidenav
        mode="over"
        position="end"
        fixedInViewport="true"
        [fixedTopGap]="sidenavTopGap"
        [fixedBottomGap]="sidenavBottomGap">
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
  displaySub!: Subscription;
  isSongToDisplay!: boolean;

  /*
   * Chain of events fired when 'Settings' is clicked in top nav bar:
   * -> subject in Settings Service emits new void value
   * -> this Dashboard component subscribes to its event emissions
   * -> this Dashboard component calls toggle() on local variable sidenav
   * -> variable is linked to mat-sidenav through the @ViewChild decorator
   */
  sidenavOpenSub!: Subscription;
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  sidenavTopGap!: number;
  sidenavBottomGap!: number;

  constructor(
    private songService: SongService,
    private sidenavService: SidenavService
  ) {
    this.displaySub = this.songService.songToDisplay$.subscribe((song) => {
      this.whatToDisplay(!!song);
    });

    this.sidenavOpenSub = this.sidenavService.openSidenav$.subscribe(() => {
      this.sidenav.toggle();
      [this.sidenavTopGap, this.sidenavBottomGap] = [100,100];
    });
  }

  /*
   * App settings are only applicable to Dashboard components; make them available by
   * unhiding the button in the nav bar
   */
  ngOnInit() {
    document.getElementById('nav-settings-btn')?.classList.remove('hide');
  }

  /* Unsubscribe on destroying component to avoid memory leaks */
  ngOnDestroy() {
    this.displaySub.unsubscribe();
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
}
