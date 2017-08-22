import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';




// 二级页面组件
import { DailyCarComponent } from './daily-car.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: DailyCarComponent,
    canActivate: [RbacService],
    data: {
      title: '每日出车统计'
    },
    children: [
      {
        path: '',
        component: ListComponent,  // 里程统计
        data: {
          title: '每日出车统计列表'
        }
      },
      {
        path: 'detail/:odid/:date',
        component: DetailComponent,  // 里程统计
        data: {
          title: '每日出车详情'
        }
      }
    ]
  }
];

export const DailyCarRoutes: ModuleWithProviders = RouterModule.forChild(routes);
