import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitLoadingModule } from '../../../../../widgets/mit-loading/mit-loading.module';
import { MitAlertModule } from '../../../../../widgets/mit-alert/mit-alert.module';
import { RealTimeConditionComponent } from './real-time-condition.component';

@NgModule({
  imports: [
    CommonModule,
    MitAlertModule,
    MitLoadingModule
  ],
  declarations: [RealTimeConditionComponent],
  exports: [RealTimeConditionComponent]
})
export class RealTimeConditionModule { }
