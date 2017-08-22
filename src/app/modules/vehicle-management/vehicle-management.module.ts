import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// 路由注入
import { VehicleManagementRoutes } from './vehicle-management.routes';


// 页面
import { VehicleManagementComponent } from './vehicle-management.component';
const page = [
  VehicleManagementComponent
];

@NgModule( {
  imports: [
    CommonModule,
    VehicleManagementRoutes
  ],
  declarations: [
    ...page
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class VehicleManagementModule { }
