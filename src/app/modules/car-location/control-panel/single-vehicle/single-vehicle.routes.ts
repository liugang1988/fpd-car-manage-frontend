import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../../rbac/rbac.service';

import { SingleVehicleComponent } from './single-vehicle.component';

// 二级页面组件
import { VehicleComponent } from './vehicle/vehicle.component';
import { DriverComponent } from './driver/driver.component';
import { CarServiceComponent } from './car-service/car-service.component';
import { StatisticsComponent } from './statistics/statistics.component';
const routes: Routes = [
  {
    path: '',
    component: SingleVehicleComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        redirectTo: 'vehicle-info'
      },
      {
        path: 'vehicle-info',
        component: VehicleComponent, // 车辆信息
        data: {
          title: '车辆信息'
        }
      },
      {
        path: 'driver-info',
        component: DriverComponent, // 驾驶员信息
        data: {
          title: '驾驶员信息'
        }
      },
      {
        path: 'car-service-info',
        component: CarServiceComponent, // 车务
        data: {
          title: '车务'
        }
      },
      {
        path: 'statistics-info',
        component: StatisticsComponent, // 档案（统计）
        data: {
          title: '档案'
        }
      }

    ]
  }
];

export const SingleVehicleRoutes: ModuleWithProviders = RouterModule.forChild(routes);




