import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from '@login/login.component';
import { MaterialModule } from '@app/shared/modules/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule
  ],
  exports: [LoginComponent]
})
export class LoginModule {}
