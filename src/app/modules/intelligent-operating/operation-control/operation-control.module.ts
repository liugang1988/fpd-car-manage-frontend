import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// 路由注入
import { OperationControlRoutes } from './operation-control.routes';


// 页面
import { OperationControlComponent } from './operation-control.component';
const page = [
  OperationControlComponent
];



@NgModule( {
  imports: [
    CommonModule,
    OperationControlRoutes,
    RouterModule,

  ],
  declarations: [
    ...page
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OperationControlModule { }
