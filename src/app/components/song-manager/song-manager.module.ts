import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { SongEditComponent } from '@app/components/song-manager/song-edit/song-edit.component';
import { SongListComponent } from '@app/components/song-manager/song-list/song-list.component';
import { SongManagerComponent } from '@app/components/song-manager/song-manager.component';
import { SongManagerRoutingModule } from '@app/components/song-manager/song-manager-routing.module';

@NgModule({
  declarations: [
    SongEditComponent,
    SongListComponent,
    SongManagerComponent
  ],
  imports: [
    CommonModule,
    SongManagerRoutingModule,
    SharedModule
  ]
})
export class SongManagerModule {}
