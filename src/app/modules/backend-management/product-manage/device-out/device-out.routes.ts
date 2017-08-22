import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { DeviceOutComponent } from './device-out.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: DeviceOutComponent,
    data: {
      title: '设备出库'
    },
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增设备出库'
        }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '设备出库详情'
        }
      }
    ]
  }
];

export const DeviceOutRoutes: ModuleWithProviders = RouterModule.forChild( routes );


