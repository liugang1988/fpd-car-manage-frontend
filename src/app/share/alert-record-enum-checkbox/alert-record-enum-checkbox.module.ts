import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertRecordEnumCheckboxComponent } from './alert-record-enum-checkbox.component';
import { AlertRecordEnumCheckboxService } from './alert-record-enum-checkbox.service';
@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ AlertRecordEnumCheckboxComponent ],
  exports: [ AlertRecordEnumCheckboxComponent ],
  providers: [ AlertRecordEnumCheckboxService ]
})
export class AlertRecordEnumCheckboxModule { }
