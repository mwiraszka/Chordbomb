import { Component } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';

import { environment } from '@environments/environment';

const searchClient = algoliasearch(
  environment.algoliaConfig.appId,
  environment.algoliaConfig.apiKey
);

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent {
  config = {
    indexName: 'songs',
    routing: true,  // test
    searchClient
  };

  constructor() {}
}
