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
  isLoading!: boolean;
  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.status.subscribe((value: boolean) => {
      this.isLoading = value;
    });
  }
}
