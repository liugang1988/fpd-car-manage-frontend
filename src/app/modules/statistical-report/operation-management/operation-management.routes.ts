import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';

import { OperationManagementComponent } from './operation-management.component';
// 二级页面组件
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '',
    component: OperationManagementComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,  // 运管统计
        data: {
          title: '运管统计'
        }
      }
    ]
  }
];

export const OperationManagementRoutes: ModuleWithProviders = RouterModule.forChild(routes);