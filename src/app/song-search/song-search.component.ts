import { Component } from '@angular/core';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent {
  fontSize: string = 'regular';
  chordType: string = 'full';

  fontSizeOptions: string[] = ['regular', 'large'];
  chordTypeOptions: string[] = ['full', 'basic', 'none'];

  constructor() {}
}
