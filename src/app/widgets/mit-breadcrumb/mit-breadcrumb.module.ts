import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MitBreadcrumbComponent } from './mit-breadcrumb.component';

const component = [
  MitBreadcrumbComponent,
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
export class MitBreadcrumbModule { }
