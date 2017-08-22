import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 路由注入
import { DeviceMaintenanceRoutes } from './device-maintenance.routes';


// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';



// 页面
import { DeviceMaintenanceComponent } from './device-maintenance.component';





@NgModule( {
  imports: [
    CommonModule,
    RbacModule,
    DeviceMaintenanceRoutes,
  ],
  declarations: [
    DeviceMaintenanceComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DeviceMaintenanceModule { }
