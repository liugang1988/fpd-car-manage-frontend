import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductTypeComponent } from './product-type.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';


const routes: Routes = [
  {
    path: '',
    component: ProductTypeComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '产品类型管理'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增类型'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '修改类型'
        }
      },
      {
        path: 'detail',
        component: ModifyComponent,
        data: {
          title: '类型详情'
        }
      }
    ]
  }
];

export const ProductTypeRoutes: ModuleWithProviders = RouterModule.forChild( routes );


