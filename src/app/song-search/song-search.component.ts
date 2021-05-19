import { Component } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent {
  faCog = faCog;

  fontSize: string = 'regular';
  chordType: string = 'full';

  fontSizeOptions: string[] = ['regular', 'large'];
  chordTypeOptions: string[] = ['full', 'basic', 'none'];

  constructor() {}
}
