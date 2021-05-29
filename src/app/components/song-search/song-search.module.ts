import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongSearchComponent } from '@app/components/song-search/song-search.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/modules/material.module';

@NgModule({
  declarations: [
    SongSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class SongSearchModule {}
