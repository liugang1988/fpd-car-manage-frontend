import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// component
import { MitTabsComponent } from './mit-tabs.component';
const component = [
  MitTabsComponent
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
export class MitTabsModule { }
