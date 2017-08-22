import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';

// 二级页面组件
import { VehicleOffLineComponent } from './vehicle-off-line.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleOffLineComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,  
        data: {
          title: '车辆状态报表'
        }
      }
    ]
  }
];

export const VehicleOffLineRoutes: ModuleWithProviders = RouterModule.forChild(routes);
