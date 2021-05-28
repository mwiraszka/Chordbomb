import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SongManagerComponent } from './song-manager/song-manager.component';
import { SongSearchComponent } from './song-search/song-search.component';

const routes: Routes = [
  { path: '', component: SongSearchComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: SongManagerComponent, canActivate: [AngularFireAuthGuard] },
  { path: '**', redirectTo: '/' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
