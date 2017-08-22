import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileAlarmComponent } from './mobile-alarm.component';
import { MitLoadingModule } from '../../widgets/mit-loading/mit-loading.module';

import { MobileAlarmService } from './mobile-alarm.service';

import { MobileAlarmRoutes } from './mobile-alarm.routes';

@NgModule( {
  imports: [
    CommonModule,
    MobileAlarmRoutes,
    MitLoadingModule,
    FormsModule
  ],
  providers: [ MobileAlarmService ],
  declarations: [ MobileAlarmComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MobileAlarmModule { }
