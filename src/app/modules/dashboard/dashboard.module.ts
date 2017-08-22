import { DriverManageService } from './../base-data/driver-manage/driver-manage.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routes';


// 公共模块
import { MitEhartsModule } from '../../widgets/mit-echarts/mit-echarts.module';
import { MitTabsModule } from '../../widgets/mit-tabs/mit-tabs.module';
import { MitLoadingModule } from '../../widgets/mit-loading/mit-loading.module';
import { MitPipeModule } from '../../widgets/mit-pipe/mit-pipe.module';
const mitModule = [
  MitEhartsModule,
  MitTabsModule,
  MitPipeModule
];


//  页面
import { DashboardComponent } from './dashboard.component';
import { VehicleOverviewComponent } from './pages/vehicle-overview/vehicle-overview.component';
import { HomeOverviewComponent } from './pages/home-overview/home-overview.component';
import { DriverManagementComponent } from './pages/driver-management/driver-management.component';
import { VehicleManagementComponent } from './pages/vehicle-management/vehicle-management.component';
const page = [
  DashboardComponent,
  HomeOverviewComponent,
  DriverManagementComponent,
  VehicleOverviewComponent,
  VehicleManagementComponent
];

// 服务
import { DriverManagementService } from './pages/driver-management/driver-management.service';
import { HomeOverviewService } from './pages/home-overview/home-overview.service';
import { VehicleManagementService } from './pages/vehicle-management/vehicle-management.service';
import { VehicleOverviewService } from './pages/vehicle-overview/vehicle-overview.service';
const services = [
  DriverManagementService,
  HomeOverviewService,
  VehicleManagementService,
  VehicleOverviewService
];


@NgModule( {
  declarations: [
    ...page
  ],
  imports: [
    ...mitModule,
    CommonModule,
    DashboardRoutes
  ],
  providers: [ ...services ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { };
