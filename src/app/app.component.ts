import { Component } from '@angular/core';
import { LoaderService } from '@app/shared/services/loader.service';

@Component({
  selector: 'app-root',
  template: `
    <div id="app-container">
      <app-header></app-header>
      <app-nav></app-nav>
      <main id="main-container">
        <router-outlet>
          <span *ngIf="isLoading" class="loading-spinner"></span>
        </router-outlet>
        <app-footer></app-footer>
      </main>
    </div>
  `
})
export class AppComponent {
  /*
   * Subscribe to Loader Service and place loader inside router outlet, so that when
   * triggered, it overlays onto whichever component is currently using it and has the
   * loading variable set to true
   */
  isLoading!: boolean;
  constructor(private loaderService: LoaderService) {
    this.loaderService.status.subscribe((value: boolean) => {
      this.isLoading = value;
    });
  }
}
