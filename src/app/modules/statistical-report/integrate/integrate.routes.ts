import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';




// 二级页面组件
import { ListComponent } from './list/list.component';
import { IntegrateComponent } from './integrate.component';




const routes: Routes = [
  {
    path: '',
    component: IntegrateComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,  // 里程统计
        data: {
          title: '综合报表'
        }
      }
    ]
  }
];

export const IntegrateRoutes: ModuleWithProviders = RouterModule.forChild(routes);
