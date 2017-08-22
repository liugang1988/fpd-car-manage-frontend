import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { MitLoadingComponent } from './mit-loading.component';
const component = [
  MitLoadingComponent
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
export class MitLoadingModule { }
