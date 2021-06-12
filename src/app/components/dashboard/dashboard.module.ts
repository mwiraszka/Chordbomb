import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';

import { MaterialModule } from '@app/shared/modules/material.module';
import { SharedModule } from '@app/shared/modules/shared.module';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { SongDisplayComponent } from '@dashboard/song-display/song-display.component';
import { SongSearchComponent } from '@dashboard/song-search/song-search.component';
import { TransformChordPipe } from '@app/shared/pipes/transform-chord.pipe';
import { TransformLabelPipe } from '@app/shared/pipes/transform-label.pipe';
import { TransformLyricPipe } from '@app/shared/pipes/transform-lyric.pipe';
import { TransformKeyPipe } from '@app/shared/pipes/transform-key.pipe';

@NgModule({
  declarations: [
    SongSearchComponent,
    SongDisplayComponent,
    DashboardComponent,
    TransformChordPipe,
    TransformLabelPipe,
    TransformLyricPipe,
    TransformKeyPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgAisModule,
    SharedModule
  ]
})
export class SongSearchModule {}
