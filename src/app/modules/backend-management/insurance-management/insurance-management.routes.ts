import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//二级页面
import { InsuranceManagementComponent } from './insurance-management.component';


const routes: Routes = [
  {
    path: '',
    component: InsuranceManagementComponent,
    data: {
      title: '保险管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'convention-insurance',// 保险管理
      },
      {
        path: 'convention-insurance',  // 常规保险管理
        loadChildren: 'app/modules/backend-management/insurance-management/convention-insurance/convention-insurance.module#ConventionInsuranceModule'
      },
      {
        path: 'ubi-insurance',  // UBI保险管理
        loadChildren: 'app/modules/backend-management/insurance-management/ubi-insurance/ubi-insurance.module#UbiInsuranceModule'
      }
    ]
  }
];

export const InsuranceManagementRoutes: ModuleWithProviders = RouterModule.forChild(routes);


