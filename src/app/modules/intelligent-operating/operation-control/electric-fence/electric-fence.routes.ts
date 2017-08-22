import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由


// 页面
import { ElectricFenceComponent } from './electric-fence.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ElectricFenceComponent,
    data: {
      title: '电子围栏'
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

export const ElectricFenceRoutes: ModuleWithProviders = RouterModule.forChild(routes);
