import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@app/components/login/login.component';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'edit',
    loadChildren: () => import('./components/song-manager/song-manager.module')
      .then(m => m.SongManagerModule),
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}