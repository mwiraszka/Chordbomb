import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongManagerComponent } from '@app/components/song-manager/song-manager.component';

const routes: Routes = [
  {
    path: '',
    component: SongManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongManagerRoutingModule {}
