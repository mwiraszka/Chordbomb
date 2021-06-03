import { Component } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';

import { environment } from '@environments/environment';
import { SongService } from '@app/shared/services/song.service';

const searchClient = algoliasearch(
  environment.algoliaConfig.appId,
  environment.algoliaConfig.apiKey
);

@Component({
  selector: 'app-algolia-lookup',
  templateUrl: './algolia-lookup.component.html',
  styleUrls: ['./algolia-lookup.component.scss']
})
export class AlgoliaLookupComponent {
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
