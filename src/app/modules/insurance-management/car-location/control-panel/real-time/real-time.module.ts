import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// 路由注入
import { RealTimeRoutes } from './real-time.routes';

// 页面
import { RealTimeComponent } from './real-time.component';
const page = [
  RealTimeComponent
];


// 公用模块
import { MitLoadingModule } from '../../../../../widgets/mit-loading/mit-loading.module';

// 服务
import { RealTimeService } from './real-time.service';

// 仪表盘模块
import { SpeedDialModule } from '../../component/speed-dial/speed-dial.module';
import { RealTimeConditionModule } from '../../component/real-time-condition/real-time-condition.module';

@NgModule( {
  imports: [
    CommonModule,
    RealTimeRoutes,
    SpeedDialModule,
    RouterModule,
    MitLoadingModule,
    RealTimeConditionModule
  ],
  declarations: [
    ...page
  ],
  providers: [ RealTimeService ]
})
export class RealTimeModule { }
