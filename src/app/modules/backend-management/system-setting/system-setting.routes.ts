import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemSettingComponent } from './system-setting.component';


const routes: Routes = [
  {
    path: '',
    component: SystemSettingComponent,
    data: {
      title: '系统设置'
    },
    children: [
      {
        path: '',
        redirectTo: 'menu-manage'
      },
      {
        path: 'menu-manage', // 菜单管控
        loadChildren: 'app/modules/backend-management/system-setting/menu-manage/menu-manage.module#MenuManageModule'
      }
    ]
  }
];

export const SystemSettingRoutes: ModuleWithProviders = RouterModule.forChild(routes);


