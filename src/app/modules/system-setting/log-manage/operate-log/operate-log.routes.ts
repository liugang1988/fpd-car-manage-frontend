import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由


// 页面
import { OperateLogComponent } from './operate-log.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: OperateLogComponent,
    data: {
      title: '操作日志管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '操作日志管理'
        }
      },
      {
        path: 'login-detail',
        component: DetailComponent,
        data: {
          title: '操作日志管理详情'
        }
      }
    ]
  }
];

export const OperateLogRoutes: ModuleWithProviders = RouterModule.forChild( routes );


