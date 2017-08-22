import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由


// 页面
import { RegionFenceComponent } from './region-fence.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: RegionFenceComponent,
    data: {
      title: '区域栅栏'
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

export const RegionFenceRoutes: ModuleWithProviders = RouterModule.forChild(routes);
