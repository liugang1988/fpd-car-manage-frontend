import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';

// 二级页面组件
import { MileageComponent } from './mileage.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: MileageComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,  // 里程统计
        data: {
          title: '里程统计'
        }
      },
      {
        path: 'detail/:VID/:time',
        component: DetailComponent,  // 里程统计详情
        data: {
          title: '里程统计详情'
        }
      }
    ]
  }
];

export const MileageRoutes: ModuleWithProviders = RouterModule.forChild(routes);
