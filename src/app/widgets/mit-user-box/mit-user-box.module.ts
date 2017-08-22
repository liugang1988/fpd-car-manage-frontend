import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// component
import { MitUserBoxComponent } from './mit-user-box.component';
const component = [
  MitUserBoxComponent
];

// service
import { UserBoxService } from './user-box.service';


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
  providers: [UserBoxService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MitUserBoxModule { }
