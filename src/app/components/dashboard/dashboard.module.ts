import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';

import { MaterialModule } from '@app/shared/modules/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { SidenavComponent } from '@app/components/sidenav/sidenav.component';
import { SongDisplayComponent } from '@dashboard/song-display/song-display.component';
import { SongSearchComponent } from '@dashboard/song-search/song-search.component';
import { TransformChordPipe } from '@app/shared/pipes/transform-chord.pipe';

@NgModule({
  declarations: [
    SongSearchComponent,
    SongDisplayComponent,
    DashboardComponent,
    SidenavComponent,
    TransformChordPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgAisModule,
    SharedModule
  ]
})
export class SongSearchModule {}
