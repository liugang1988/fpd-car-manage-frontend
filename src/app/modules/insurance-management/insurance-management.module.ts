import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InsuranceManagementRoutes } from './insurance-management.routes';



//  页面
import { InsuranceManagementComponent } from './insurance-management.component';




@NgModule( {
  declarations: [
    InsuranceManagementComponent
  ],
  imports: [
    CommonModule,
    InsuranceManagementRoutes
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InsuranceManagementModule { };
