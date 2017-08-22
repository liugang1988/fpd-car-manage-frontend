import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// 路由注入
import { UbiModelManagementRoutes } from './ubi-model-management.routes';

// 页面
import { UbiModelManagementComponent } from './ubi-model-management.component';

// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';



@NgModule( {
  declarations: [
    UbiModelManagementComponent
  ],
  imports: [
    CommonModule,
    UbiModelManagementRoutes,
    RbacModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UbiModelManagementModule { };
