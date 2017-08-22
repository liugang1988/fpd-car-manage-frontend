import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SystemSettingRoutes } from './system-setting.routes';

//  页面
import { SystemSettingComponent } from './system-setting.component';



@NgModule( {
  declarations: [
    SystemSettingComponent
  ],
  imports: [
    SystemSettingRoutes
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SystemSettingModule { };
