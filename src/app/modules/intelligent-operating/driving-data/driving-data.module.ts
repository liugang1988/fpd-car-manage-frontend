import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';


// 路由注入
import { DrivingDataRoutes } from './driving-data.routes';

// 页面
import { DrivingDataComponent } from './driving-data.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
const page = [
  DrivingDataComponent,
  ListComponent,
  DetailComponent,
  TrackDetailComponent
];

// 公用组件
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitEhartsModule } from '../../../widgets/mit-echarts/mit-echarts.module';
import { MitBaiduMapModule } from '../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { MapEventFilterModule } from '../../../share/map-event-filter/map-event-filter.module';
import { GradientPathIntroModule } from '../../../share/gradient-path-intro/gradient-path-intro.module';
import { MitModalModule } from './../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  MitEhartsModule,
  MitBaiduMapModule,
  DepartmentSelectModule,
  MapEventFilterModule,
  GradientPathIntroModule,
  MitModalModule,
  OrganizationTreeSelectModule
];

// 服务
import { DrivingDataService } from './driving-data.service';

@NgModule({
  imports: [
    CommonModule,
    DrivingDataRoutes,
    ...mitModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  declarations: [
    ...page
  ],
  providers: [DrivingDataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrivingDataModule { }
