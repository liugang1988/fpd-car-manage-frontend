import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierManageComponent } from './supplier-manage.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';


const routes: Routes = [
  {
    path: '',
    component: SupplierManageComponent,
    data: {
      title: '供应商管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '供应商'
        }
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
          title: '修改'
        }
      },
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

export const SupplierManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


