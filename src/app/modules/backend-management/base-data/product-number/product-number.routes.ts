import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductNumberComponent } from './product-number.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductNumberComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '产品型号管理'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '产品型号新增'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '产品型号修改'
        }
      },
      {
        path: 'detail/:id',
        component: ModifyComponent,
        data: {
          title: '产品型号详情'
        }
      }
    ]
  }
];

export const ProductNumberRoutes: ModuleWithProviders = RouterModule.forChild( routes );


