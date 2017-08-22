import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';




// 二级页面组件
import { DriverRankComponent } from './driver-rank.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: DriverRankComponent,
    canActivate: [RbacService],
    data: {
      title: '驾驶员排名'
    },
    children: [
      {
        path: '',
        component: ListComponent,  // 里程统计
        data: {
          title: '驾驶员排名'
        }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,  // 里程统计
        data: {
          title: 'KPI详情'
        }
      }
    ]
  }
];

export const DriverRankRoutes: ModuleWithProviders = RouterModule.forChild(routes);
