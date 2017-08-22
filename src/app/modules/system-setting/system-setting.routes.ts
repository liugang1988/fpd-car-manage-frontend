import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SystemSettingComponent } from './system-setting.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: '系统设置'
    },
    component: SystemSettingComponent,
    children: [
      { path: '', redirectTo: 'user-manage' },
      {
        path: 'user-manage',
        loadChildren: 'app/modules/system-setting/user-manage/user-manage.module#UserManageModule'  // 用户管理
      },
      {
        path: 'role-manage',
        loadChildren: 'app/modules/system-setting/role-manage/role-manage.module#RoleManageModule'  // 角色管理
      },
      {
        path: 'department-manage',
        loadChildren: 'app/modules/system-setting/department-manage/department-manage.module#DepartmentManageModule' // 部门管理
      },
      {
        path: 'log-manage',
        loadChildren: 'app/modules/system-setting/log-manage/log-manage.module#LogManageModule' // 日志管理
      },
      {
        path: 'fence-setting',
        loadChildren: 'app/modules/system-setting/fence-setting/fence-setting.module#FenceSettingModule'  // 栅栏设置
      },
      {
        path: 'event-set',
        loadChildren: 'app/modules/system-setting/event-set/event-set.module#EventSetModule'  // 栅栏设置
      }
    ]
  }
];

export const SystemSettingRoutes: ModuleWithProviders = RouterModule.forChild( routes );


