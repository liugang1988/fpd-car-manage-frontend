import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// 页面
import { SoftwareVersionComponent } from './software-version.component';
import { ListComponent } from './list/list.component'; // 列表
import { ModifyComponent } from './modify/modify.component'; // 新增或者编辑
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: SoftwareVersionComponent,
    data: {
      title: '软件版本管理'
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
          name: '软件版本添加'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          name: '软件版本编辑'
        }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          name: '软件版本详情'
        }
      }
    ]
  }
];

export const SoftwareVersionRoutes: ModuleWithProviders = RouterModule.forChild( routes );


