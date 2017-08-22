import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由


// 页面
import { LoginLogComponent } from './login-log.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '',
    component: LoginLogComponent,
    data: {
      title: '登录日志'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '登录日志管理'
        }
      }
    ]
  }
];

export const LogininLogRoutes: ModuleWithProviders = RouterModule.forChild( routes );


