import { Component } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import * as algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'EGCKVSN4PS',
  '1dfb51e5d328e2efcf769a74182ebf1e'
);

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent {
  faCog = faCog;

  fontSize: string = 'regular';
  chordType: string = 'full';
  fontSizes: string[] = ['regular', 'large'];
  chordTypes: string[] = ['full', 'basic', 'none'];

  // config = {
  //   apiKey: '1dfb51e5d328e2efcf769a74182ebf1e',
  //   appId: 'EGCKVSN4PS',
  //   indexName: 'songs',
  //   routing: true
  // };

  config = {
    indexName: 'songs',
    searchClient
  };

  constructor() {}
}
