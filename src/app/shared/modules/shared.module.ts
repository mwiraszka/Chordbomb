import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';

const modules = [
  FontAwesomeModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    TruncatePipe
  ],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    modules,
    TruncatePipe
  ]
})
export class SharedModule {}
