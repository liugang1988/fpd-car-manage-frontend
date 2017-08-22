import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';






// 二级页面组件
import { DrivingBehaviorComponent } from './driving-behavior.component';
import { ListComponent } from './list/list.component';




const routes: Routes = [
  {
    path: '',
    component: DrivingBehaviorComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,  // 里程统计
        data: {
          title: '驾驶行为'
        }
      }
    ]
  }
];

export const DrivingBehaviorRoutes: ModuleWithProviders = RouterModule.forChild(routes);
