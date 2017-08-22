import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UbiRealTimeInsuranceComponent } from './ubi-real-time-insurance.component';
@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [ UbiRealTimeInsuranceComponent ],
  exports: [ UbiRealTimeInsuranceComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UbiRealTimeInsuranceModule { }
