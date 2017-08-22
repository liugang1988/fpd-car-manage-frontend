import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//二级页面
import { VehicleManagementComponent } from './vehicle-management.component';


const routes: Routes = [
  {
    path: '',
    component: VehicleManagementComponent,
    data: {
      title: '车辆管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'vehicle-record-manage',
      },
      {
        path: 'vehicle-record-manage', // 车辆管理列表
        loadChildren: 'app/modules/backend-management/vehicle-management/vehicle-record-manage/vehicle-record-manage.module#VehicleRecordManageModule'
      },
      {
        path: 'insurance-price/:Vid', // 常规保险核价
        loadChildren: 'app/modules/backend-management/vehicle-management/insurance-price/insurance-price.module#InsurancePriceModule'
      }
    ]
  }
];

export const VehicleManagementRoutes: ModuleWithProviders = RouterModule.forChild(routes);


