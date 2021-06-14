import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-manager',
  template: `
    <section id="song-manager-container">
      <app-song-edit></app-song-edit>
      <app-song-list></app-song-list>
    </section>
  `
})
export class SongManagerComponent implements OnInit {
  /* Hide top nav settings button since it is only applicable to Dashboard component */
  ngOnInit() {
    document.getElementById('nav-settings-btn')?.classList.add('hide');
  }
}
