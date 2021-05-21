import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app-container">
      <app-header></app-header>
      <app-nav></app-nav>
      <main>
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
