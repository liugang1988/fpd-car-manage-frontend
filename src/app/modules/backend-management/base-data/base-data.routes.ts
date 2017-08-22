import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseDataComponent } from './base-data.component';


const routes: Routes = [
  {
    path: '',
    component: BaseDataComponent,
    data: {
      title: '基础数据管理'
    }
    ,
    children: [
      {
        path: '',
        redirectTo: 'customer-manage'
      },
      {
        path: 'customer-manage',
        loadChildren: 'app/modules/backend-management/base-data/customer-manage/customer-manage.module#CustomerManageModule' // 客户管理
      },
      {
        path: 'supplier-manage',
        loadChildren: 'app/modules/backend-management/base-data/supplier-manage/supplier-manage.module#SupplierManageModule' // 供应商管理
      },
      {
        path: 'user-register-manage',
        loadChildren: 'app/modules/backend-management/base-data/user-register-manage/user-register-manage.module#UserRegisterManageModule' // 用户注册管理
      },
      {
        path: 'software-version',
        loadChildren: 'app/modules/backend-management/base-data/software-version/software-version.module#SoftwareVersionModule' // 软件版本
      },
      {
        path: 'product-type',
        loadChildren: 'app/modules/backend-management/base-data/product-type/product-type.module#ProductTypeModule' // 产品类型
      },
      {
        path: 'product-number',
        loadChildren: 'app/modules/backend-management/base-data/product-number/product-number.module#ProductNumberModule' // 产品型号
      },
      {
        path: 'app-version-manage',
        loadChildren: 'app/modules/backend-management/base-data/app-version-manage/app-version-manage.module#AppVersionManageModule' // APP版本管理
      }
    ]
  }
];

export const BaseDataRoutes: ModuleWithProviders = RouterModule.forChild(routes);


