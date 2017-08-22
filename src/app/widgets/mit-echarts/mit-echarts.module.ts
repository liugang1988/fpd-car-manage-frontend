// auth: by Junchao Zheng
// date:  2016.12.17


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { MitEchartsComponent } from './mit-echarts.component';
const component = [
  MitEchartsComponent
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
export class MitEhartsModule { }
