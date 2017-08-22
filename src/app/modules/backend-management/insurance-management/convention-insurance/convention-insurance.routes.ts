import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { ConventionInsuranceComponent } from './convention-insurance.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: ConventionInsuranceComponent,
    data: {
      title: '常规保险管理'
    },
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '常规保险详情'
        }
      }
    ]
  }
];

export const ConventionInsuranceRoutes: ModuleWithProviders = RouterModule.forChild(routes);


