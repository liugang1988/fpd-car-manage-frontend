import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { UbiInsuranceComponent } from './ubi-insurance.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { UbiListComponent } from './ubi-list/ubi-list.component';
import { UbiDetailComponent } from './ubi-detail/ubi-detail.component';


const routes: Routes = [
  {
    path: '',
    component: UbiInsuranceComponent,
    data: {
      title: 'UBI保险管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'detail/:ID',
        component: DetailComponent,
        data: {
          title: 'UBI保险详情'
        },
      },
      {
        path: 'ubi-list/:Vid',
        component: UbiListComponent,
        data: {
          title: 'UBI保费明细'
        },
      },
      {
        path: 'ubi-detail/:ID',
        component: UbiDetailComponent,
        data: {
          title: 'UBI保费明细详情'
        },
      }
    ]
  }
];

export const UbiInsuranceRoutes: ModuleWithProviders = RouterModule.forChild(routes);


