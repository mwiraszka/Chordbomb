import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <a href="https://chordbomb.com" id="home">
        <img id="logo" src="../assets/chordbomb.svg" alt="Chordbomb Logo">
      </a>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
