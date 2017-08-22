import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CustomerComponent } from './customer.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { ModifyComponent } from './modify/modify.component';



const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: {
      title: '客户管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '客户管理'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增客户'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '编辑客户'
        }
      }
    ]
  }
];

export const CustomerRoutes: ModuleWithProviders = RouterModule.forChild(routes);


