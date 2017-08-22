import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { InsuranceCompanyComponent } from './insurance-company.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';


const routes: Routes = [
  {
    path: '',
    component: InsuranceCompanyComponent,
    data: {
      title: '保险公司'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'add',
        component: ModifyComponent,
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
      }
    ]
  }
];

export const InsuranceCompanyRoutes: ModuleWithProviders = RouterModule.forChild( routes );


