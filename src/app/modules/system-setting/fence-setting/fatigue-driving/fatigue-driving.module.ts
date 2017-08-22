import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由注入
import { FatigueDrivingRoutes } from './fatigue-driving.routes';


// 页面
import { FatigueDrivingComponent } from './fatigue-driving.component';
import { ListComponent } from './list/list.component';
const page = [
  FatigueDrivingComponent,
  ListComponent
];

// 公用模块
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitBaiduMapModule } from '../../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
const mitModule = [
  MitLoadingModule,
  MitBaiduMapModule,
  MitAlertModule,
  MitDataTableModule
];

// 服务
import { FatigueDrivingService } from './fatigue-driving.service';

@NgModule({
  imports: [
    CommonModule,
    FatigueDrivingRoutes,
    FormsModule,
    ReactiveFormsModule,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [FatigueDrivingService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FatigueDrivingModule { }
