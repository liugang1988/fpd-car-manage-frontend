import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由


// 页面
import { SpeedFenceComponent } from './speed-fence.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: SpeedFenceComponent,
    data: {
      title: '超速'
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

export const SpeedFenceRoutes: ModuleWithProviders = RouterModule.forChild(routes);
