import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由
import { RbacService } from '../../../rbac/rbac.service';



// 页面
import { DrivingDataComponent } from './driving-data.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';



const routes: Routes = [
  {
    path: '',
    component: DrivingDataComponent,
    canActivate: [RbacService],
    data: {
      title: '行车数据'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'detail/:vid',
        component: DetailComponent,
        data: {
          title: '行车数据详情'
        }
      },
      {
        path: 'detail/:vid/:StartTime',
        component: DetailComponent,
        data: {
          title: '行车数据详情'
        }
      },
      {
        path: 'track-detail/:trackid',
        component: TrackDetailComponent,
        data: {
          title: '单程行车数据',
        }
      }
    ]
  }
];

export const DrivingDataRoutes: ModuleWithProviders = RouterModule.forChild(routes);
