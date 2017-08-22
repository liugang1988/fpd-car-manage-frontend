import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// 页面
import { LogManageComponent } from './log-manage.component';

// 服务
import { RbacService } from '../../../rbac/rbac.service';


const routes: Routes = [
  {
    path: '',
    data: {
      title: '日志管理'
    },
    canActivate: [ RbacService ],
    component: LogManageComponent,
    children: [
      {
        path: 'login-log',
        loadChildren: 'app/modules/system-setting/log-manage/login-log/login-log.module#LoginLogModule'   // 登录日志
      },
      {
        path: 'operate-log',
        loadChildren: 'app/modules/system-setting/log-manage/operate-log/operate-log.module#OperateLogModule'  // 操作日志
      }
    ]
  }
];

export const LogManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


