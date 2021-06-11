import { Component } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';

import { SongService } from '@app/shared/services/song.service';
import { environment } from '@environments/environment';

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

  isRefinement = false;

  constructor(private songService: SongService) {}

  onClickRefinements() {
    this.isRefinement != this.isRefinement;
    console.log('clicked')
  }

  onSelect(id: string) {
    this.songService.setSongToDisplay(id);
  }
}
