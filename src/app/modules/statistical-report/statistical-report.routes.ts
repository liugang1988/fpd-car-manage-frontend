import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../rbac/rbac.service';


// 布局组件
import { MitLayoutComponent } from '../../widgets/mit-layout/mit-layout.component';


// 二级页面组件
import { StatisticalReportComponent } from './statistical-report.component';




const routes: Routes = [
  {
    path: '',
    component: StatisticalReportComponent,
    canActivate: [RbacService],
    data: {
      title: '统计报表'
    },
    children: [
      {
        path: 'mileage',
        loadChildren: 'app/modules/statistical-report/mileage/mileage.module#MileageModule',  // 里程统计
      },
      {
        path: 'fuel-consumption',
        loadChildren: 'app/modules/statistical-report/fuel-consumption/fuel-consumption.module#FuelConsumptionModule',  // 油耗统计
      },
      {
        path: 'operation-management',
        loadChildren: 'app/modules/statistical-report/operation-management/operation-management.module#OperationManagementModule',  // 运管统计
      },
      {
        path: 'security-alerts',
        loadChildren: 'app/modules/statistical-report/security-alerts/security-alerts.module#SecurityAlertsModule',  // 驾驶行为
      },
      {
        path: 'driving-behavior',
        loadChildren: 'app/modules/statistical-report/driving-behavior/driving-behavior.module#DrivingBehaviorModule',  // 驾驶行为
      },
      {
        path: 'operational-data',
        loadChildren: 'app/modules/statistical-report/operational-data/operational-data.module#OperationalDataModule',  // 运营数据
      },
      {
        path: 'driver-rank',
        loadChildren: 'app/modules/statistical-report/driver-rank/driver-rank.module#DriverRankModule',  // 驾驶员排名
      },
      {
        path: 'integrate',
        loadChildren: 'app/modules/statistical-report/integrate/integrate.module#IntegrateModule',  // 综合报表
      },
      {
        path: 'dailycar',
        loadChildren: 'app/modules/statistical-report/daily-car/daily-car.module#DailyCarModule',  // 每日出车统计
      },
      {
        path: 'vehicle-off-line',
        loadChildren: 'app/modules/statistical-report/vehicle-off-line/vehicle-off-line.module#VehicleOffLineModule',  // 车辆离线统计
      },
    ]
  }
];

export const StatisticalReportRoutes: ModuleWithProviders = RouterModule.forChild(routes);
