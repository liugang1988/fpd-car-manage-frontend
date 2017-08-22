import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// 路由注入
import { InsuranceManagementRoutes } from './insurance-management.routes';

// 页面
import { InsuranceManagementComponent } from './insurance-management.component';

// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';



@NgModule( {
  declarations: [
    InsuranceManagementComponent
  ],
  imports: [
    CommonModule,
    InsuranceManagementRoutes,
    RbacModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InsuranceManagementModule { };
