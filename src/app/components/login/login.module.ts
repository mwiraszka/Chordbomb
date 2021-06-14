import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/modules/shared.module';
import { MaterialModule } from '@app/shared/modules/material.module';
import { LoginComponent } from '@login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {}
