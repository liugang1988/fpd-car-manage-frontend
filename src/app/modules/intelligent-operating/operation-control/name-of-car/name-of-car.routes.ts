import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由


// 页面
import { NameOfCarComponent } from './name-of-car.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: NameOfCarComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'edit/:id',
        component: ModifyComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
    ]
  }
];

export const NameOfCarRoutes: ModuleWithProviders = RouterModule.forChild(routes);
