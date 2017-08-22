import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppVersionManageComponent } from './app-version-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: AppVersionManageComponent,
    data: {
      title: 'APP版本管理'
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
          title: '发布'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '编辑'
        }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '软件版本详情'
        }
      }
    ]
  }
];

export const AppVersionManageRoutes: ModuleWithProviders = RouterModule.forChild(routes);


