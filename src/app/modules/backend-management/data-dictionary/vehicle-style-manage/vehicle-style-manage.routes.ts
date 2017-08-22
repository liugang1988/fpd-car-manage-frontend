import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { VehicleStyleManageComponent } from './vehicle-style-manage.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';



const routes: Routes = [
  {
    path: '',
    component: VehicleStyleManageComponent,
    data: {
      title: '车辆年款管理'
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
            title: '新增车辆年款'
        }
      }
    ]
  }
];

export const VehicleStyleManageRoutes: ModuleWithProviders = RouterModule.forChild(routes);


