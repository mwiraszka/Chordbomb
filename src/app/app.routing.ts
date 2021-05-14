import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/login/login.component';
import { SongManagerComponent } from '@app/song-manager/song-manager.component';
import { SongSearchComponent } from '@app/song-search/song-search.component';

const routes: Routes = [
  { path: '', component: SongSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: SongManagerComponent, canActivate: [AngularFireAuthGuard] },
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
