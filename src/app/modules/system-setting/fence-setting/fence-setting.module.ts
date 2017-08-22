import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FenceSettingComponent } from './fence-setting.component';

// 路由注入
import { FenceSettingRoutes } from './fence-setting.routes';

@NgModule( {
  imports: [
    CommonModule,
    FenceSettingRoutes
  ],
  declarations: [ FenceSettingComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FenceSettingModule { }
