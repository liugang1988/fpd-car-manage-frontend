import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';





// 二级页面组件
import { SecurityAlertsComponent } from './security-alerts.component';
import { ListComponent } from './list/list.component';




const routes: Routes = [
  {
    path: '',
    component: SecurityAlertsComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,  // 里程统计
        data: {
          title: '安全警报'
        }
      }
    ]
  }
];

export const SecurityAlertsRoutes: ModuleWithProviders = RouterModule.forChild(routes);
