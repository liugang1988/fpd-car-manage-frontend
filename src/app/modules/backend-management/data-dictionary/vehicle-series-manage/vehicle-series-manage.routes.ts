import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { VehicleSeriesManageComponent } from './vehicle-series-manage.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';



const routes: Routes = [
  {
    path: '',
    component: VehicleSeriesManageComponent,
    data: {
      title: '车辆系列管理'
    },
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
            title: '新增车辆系列'
        }
      }
    ]
  }
];

export const VehicleSeriesManageRoutes: ModuleWithProviders = RouterModule.forChild(routes);


