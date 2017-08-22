import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { MitModalComponent } from './mit-modal.component';
const component = [
  MitModalComponent
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
export class MitModalModule { }
