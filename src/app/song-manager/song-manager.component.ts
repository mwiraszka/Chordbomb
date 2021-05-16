import { Component } from '@angular/core';

@Component({
  selector: 'app-song-manager',
  template: `
    <section id="song-manager">
      <div id="col-left">
        <app-song-edit></app-song-edit>
      </div>
      <div id="col-right">
        <app-song-list></app-song-list>
      </div>
    </section>
  `,
  styles: [
    `
      #song-manager {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
      #col-left {
        width: 60%;
      }
      #col-right {
        width: 30%;
      }
    `
  ]
})
export class SongManagerComponent {
  constructor() {}
}
