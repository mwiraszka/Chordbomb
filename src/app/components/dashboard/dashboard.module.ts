import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/shared/modules/material.module';
import { SharedModule } from '@app/shared/modules/shared.module';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { SongDisplayComponent } from '@dashboard/song-display/song-display.component';
import { SongSearchComponent } from '@dashboard/song-search/song-search.component';
import { TransformChordPipe } from '@app/shared/pipes/transform-chord.pipe';
import { TransformKeyPipe } from '@app/shared/pipes/transform-key.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    SongDisplayComponent,
    SongSearchComponent,
    TransformChordPipe,
    TransformKeyPipe
  ],
  imports: [CommonModule, MaterialModule, SharedModule]
})
export class SongSearchModule {}
