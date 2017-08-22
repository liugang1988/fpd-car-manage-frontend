import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IntelligentOperatingRoutes } from './intelligent-operating.routes';



//  页面
import { IntelligentOperatingComponent } from './intelligent-operating.component';




@NgModule( {
  declarations: [
    IntelligentOperatingComponent
  ],
  imports: [
    CommonModule,
    IntelligentOperatingRoutes
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class IntelligentOperatingModule { };
