import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitAlertComponent } from './mit-alert.component';

const component = [
  MitAlertComponent
];

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    ...component
  ],
  exports: [
    ...component
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MitAlertModule { }
