import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDataRoutes } from './base-data.routes';






//  页面
import { BaseDataComponent } from './base-data.component';
const page = [
  BaseDataComponent
];

// 权限控制模块
import { RbacModule } from '../../rbac/rbac.module';

@NgModule( {
  declarations: [
    ...page,
  ],
  imports: [
    CommonModule,
    BaseDataRoutes,
    RbacModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BaseDataModule { };
