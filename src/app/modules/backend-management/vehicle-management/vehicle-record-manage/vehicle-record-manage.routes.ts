import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { VehicleRecordManageComponent } from './vehicle-record-manage.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [
  {
    path: '',
    component: VehicleRecordManageComponent,
    data: {
      title: '车辆档案管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      }
    ]
  }
];

export const VehicleRecordManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


