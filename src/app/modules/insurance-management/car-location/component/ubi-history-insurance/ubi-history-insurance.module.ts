import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UbiHistoryInsuranceComponent } from './ubi-history-insurance.component';
@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [ UbiHistoryInsuranceComponent ],
  exports: [ UbiHistoryInsuranceComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UbiHistoryInsuranceModule { }
