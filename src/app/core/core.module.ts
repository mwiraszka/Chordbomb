import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '@app/components/footer/footer.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { NavComponent } from '@app/components/nav/nav.component';
import { SharedModule } from '@app/shared/shared.module';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule,
    RouterModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  exports: [
    AngularFireModule,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    SharedModule,
    ToastrModule
  ]
})
export class CoreModule {}
