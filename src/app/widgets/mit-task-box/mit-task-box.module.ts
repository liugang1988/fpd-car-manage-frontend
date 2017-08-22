import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



// component
import { MitTaskBoxComponent } from './mit-task-box.component';
const component = [
  MitTaskBoxComponent
];

import { MitTaskBoxService } from './mit-task-box.service';

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
  providers: [ MitTaskBoxService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MitTaskBoxModule { }
