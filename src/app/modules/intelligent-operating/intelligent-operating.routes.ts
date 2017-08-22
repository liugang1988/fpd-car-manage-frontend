import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../rbac/rbac.service';



// 页面组件
import { IntelligentOperatingComponent } from './intelligent-operating.component';



const routes: Routes = [
  {
    path: '',
    component: IntelligentOperatingComponent,
    data: {
      title: '智能运营'
    },
    canActivate: [RbacService],
    children: [
      {
        path: '',
        redirectTo: 'vehicle-condition-monitor'
      },
      {
        path: 'vehicle-condition-monitor',
        loadChildren: 'app/modules/intelligent-operating/vehicle-condition-monitor/vehicle-condition-monitor.module#VehicleConditionMonitorModule' // 车况监控
      },
      {
        path: 'security-alert',
        loadChildren: 'app/modules/intelligent-operating/security-alert/security-alert.module#SecurityAlertModule'  // 安全警报
      },
      {
        path: 'power-manage',
        loadChildren: 'app/modules/intelligent-operating/power-manage/power-manage.module#PowerManageModule' // 电量管理
      },
      {
        path: 'operation-control',
        loadChildren: 'app/modules/intelligent-operating/operation-control/operation-control.module#OperationControlModule'  // 运行管控
      },
      {
        path: 'driving-data',
        loadChildren: 'app/modules/intelligent-operating/driving-data/driving-data.module#DrivingDataModule' // 行车数据
      },
      {
        path: 'chase-car',
        loadChildren: 'app/modules/intelligent-operating/chase-car/chase-car.module#ChaseCarModule' // 追车管理
      },
      {
        path: 'vehicle-fault',
        loadChildren: 'app/modules/intelligent-operating/vehicle-fault/vehicle-fault.module#VehicleFaultModule' // 故障提示
      }
    ]
  }
];

export const IntelligentOperatingRoutes: ModuleWithProviders = RouterModule.forChild(routes);
