import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { DeviceLibraryComponent } from './device-library.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: DeviceLibraryComponent,
    data: {
      title: '设备库'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '设备库'
        },
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '编辑'
        }
      }
      ,
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '详情'
        }
      }

    ]
  }
];

export const DeviceOutRoutes: ModuleWithProviders = RouterModule.forChild( routes );


