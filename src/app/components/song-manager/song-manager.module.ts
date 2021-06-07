import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { SongEditComponent } from '@song-manager/song-edit/song-edit.component';
import { SongListComponent } from '@song-manager/song-list/song-list.component';
import { SongManagerComponent } from '@song-manager/song-manager.component';
import { SongManagerRoutingModule } from '@song-manager/song-manager-routing.module';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';

@NgModule({
  declarations: [
    SongEditComponent,
    SongListComponent,
    SongManagerComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    SongManagerRoutingModule,
    SharedModule
  ]
})
export class SongManagerModule {}
