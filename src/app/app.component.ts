import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app-container">
      <app-header></app-header>
      <app-nav></app-nav>
      <main id="main-container">
        <router-outlet></router-outlet>
        <app-footer></app-footer>
      </main>
    </div>
  `
})
export class AppComponent {}
