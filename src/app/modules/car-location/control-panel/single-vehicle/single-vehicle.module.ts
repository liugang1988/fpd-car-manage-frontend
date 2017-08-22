import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


// 公用模块
import { SpeedDialModule } from '../../component/speed-dial/speed-dial.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitPipeModule } from '../../../../widgets/mit-pipe/mit-pipe.module';


// 路由注入
import { SingleVehicleRoutes } from './single-vehicle.routes';

// 页面
import { SingleVehicleComponent } from './single-vehicle.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DriverComponent } from './driver/driver.component';
import { CarServiceComponent } from './car-service/car-service.component';
import { StatisticsComponent } from './statistics/statistics.component';
const page = [
  SingleVehicleComponent,
  VehicleComponent,
  DriverComponent,
  CarServiceComponent,
  StatisticsComponent
];

// 服务
import { SingleVehicleService } from './single-vehicle.service';

@NgModule({
  imports: [
    MitLoadingModule,
    SpeedDialModule,
    RouterModule,
    CommonModule,
    MitPipeModule,
    SingleVehicleRoutes
  ],
  declarations: [
    ...page
  ],
  providers: [SingleVehicleService]
})
export class SingleVehicleModule { }
