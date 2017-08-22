import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// component
import { MitStarsComponent } from './mit-stars.component';
const component = [
  MitStarsComponent
];


@NgModule( {
  imports: [
    RouterModule,
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
export class MitStarsModule { }
