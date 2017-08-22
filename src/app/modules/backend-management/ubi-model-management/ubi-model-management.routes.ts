import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//二级页面
import { UbiModelManagementComponent } from './ubi-model-management.component';


const routes: Routes = [
  {
    path: '',
    component: UbiModelManagementComponent,
    data: {
      title: 'UBI模型管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'ubi-model',
      },
      {
        path: 'ubi-model', // ubi模型
        loadChildren: 'app/modules/backend-management/ubi-model-management/ubi-model/ubi-model.module#UbiModelModule'
      },
      {
        path: 'insurance-company', // 保险公司
        loadChildren: 'app/modules/backend-management/ubi-model-management/insurance-company/insurance-company.module#InsuranceCompanyModule'
      },
      {
        path: 'insurance-project', // 保险项目
        loadChildren: 'app/modules/backend-management/ubi-model-management/insurance-project/insurance-project.module#InsuranceProjectModule'
      },
      {
        path: 'insurance-quote', // 保险报价算法
        loadChildren: 'app/modules/backend-management/ubi-model-management/insurance-quote/insurance-quote.module#InsuranceQuoteModule'
      }
    ]
  }
];

export const UbiModelManagementRoutes: ModuleWithProviders = RouterModule.forChild(routes);


