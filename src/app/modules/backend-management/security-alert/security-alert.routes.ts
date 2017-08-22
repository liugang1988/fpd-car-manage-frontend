import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由
import { RbacService } from '../../../rbac/rbac.service';


// 页面
import { SecurityAlertComponent } from './security-alert.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '',
    component: SecurityAlertComponent,
    canActivate: [RbacService],
    data: {
      title: '安全警报'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '详情'
        }
      }
    ]
  }
];

export const SecurityAlertRoutes: ModuleWithProviders = RouterModule.forChild(routes);
