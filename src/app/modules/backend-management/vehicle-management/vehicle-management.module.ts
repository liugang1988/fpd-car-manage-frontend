import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// 路由注入
import { VehicleManagementRoutes } from './vehicle-management.routes';

// 页面
import { VehicleManagementComponent } from './vehicle-management.component';

// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';



@NgModule( {
  declarations: [
    VehicleManagementComponent
  ],
  imports: [
    CommonModule,
    VehicleManagementRoutes,
    RbacModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class VehicleManagementModule { };
