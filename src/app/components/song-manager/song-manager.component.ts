import { Component } from '@angular/core';

@Component({
  selector: 'app-song-manager',
  template: `
    <section id="song-manager">
      <app-song-edit></app-song-edit>
      <app-song-list></app-song-list>
    </section>
  `
})
export class SongManagerComponent {}
