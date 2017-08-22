import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarStatusComponent } from './car-status.component';
@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    CarStatusComponent
  ],
  exports: [
    CarStatusComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CarStatusModule { }
