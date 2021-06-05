import { Component } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';

import { environment } from '@environments/environment';
import { SongService } from '@app/shared/services/song.service';

const searchClient = algoliasearch(
  environment.algoliaConfig.appId,
  environment.algoliaConfig.apiKey
);

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html'
})
export class SongSearchComponent {
  config = {
    indexName: 'songs',
    routing: true,
    searchClient
  };

  constructor(private songService: SongService) {}

  onSelect(id: string) {
    this.songService.changeSongToDisplay(id);
  }
}
