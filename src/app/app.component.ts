import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <app-header></app-header>
      <app-nav></app-nav>
      <section id="app-main">
        <router-outlet></router-outlet>
        <app-footer></app-footer>
      </section>
    </div>
  `
})
export class AppComponent {}
