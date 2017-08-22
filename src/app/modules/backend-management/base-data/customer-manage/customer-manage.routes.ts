import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerManageComponent } from './customer-manage.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerManageComponent,
    children: [
      {
        path: '',
        redirectTo: 'customer'
      },
      {
        path: 'customer',
        loadChildren: 'app/modules/backend-management/base-data/customer-manage/customer/customer.module#CustomerModule' // 客户管理
      },
      {
        path: 'user/:OrganizationId',
        loadChildren: 'app/modules/backend-management/base-data/customer-manage/user/user.module#UserModule' // 用户管理
      },
    ]
  }
];

export const CustomerManageRoutes: ModuleWithProviders = RouterModule.forChild(routes);


