import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// 路由注入
import { SystemSettingRoutes } from './system-setting.routes';

// 页面
import { SystemSettingComponent } from './system-setting.component';

// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';


@NgModule( {
  declarations: [
    SystemSettingComponent,
  ],
  imports: [
    CommonModule,
    SystemSettingRoutes,
    RbacModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SystemSettingModule { };
