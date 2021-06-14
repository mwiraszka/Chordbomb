import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongManagerComponent } from '@song-manager/song-manager.component';

/* Empty path URL ('/') directs user to the Song Manager component, lazily loaded */
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
