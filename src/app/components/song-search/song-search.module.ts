import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';

import { MaterialModule } from '@app/shared/modules/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { AlgoliaLookupComponent } from '@app/components/song-search/algolia-lookup/algolia-lookup.component';
import { SongSearchComponent } from '@app/components/song-search/song-search.component';
import { SongDisplayComponent } from '@app/components/song-search/song-display/song-display.component';

@NgModule({
  declarations: [
    AlgoliaLookupComponent,
    SongDisplayComponent,
    SongSearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgAisModule,
    SharedModule
  ]
})
export class SongSearchModule {}
