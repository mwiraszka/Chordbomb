import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';

import { DashboardComponent } from '@app/components/dashboard/dashboard.component';
import { MaterialModule } from '@app/shared/modules/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { SongSearchComponent } from '@app/components/dashboard/song-search/song-search.component';
import { SongDisplayComponent } from '@app/components/dashboard/song-display/song-display.component';

@NgModule({
  declarations: [
    DashboardComponent,
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
export class DashboardModule {}
