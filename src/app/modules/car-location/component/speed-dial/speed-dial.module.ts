import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitEhartsModule } from '../../../../widgets/mit-echarts/mit-echarts.module';

import { SpeedDialComponent } from './speed-dial.component';
@NgModule( {
  imports: [
    MitEhartsModule,
    CommonModule
  ],
  declarations: [ SpeedDialComponent ],
  exports: [ SpeedDialComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SpeedDialModule { }
