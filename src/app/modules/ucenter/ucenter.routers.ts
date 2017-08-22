import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UcenterComponent } from './ucenter.component';

// 二级页面组件

import { PersonalCenterComponent } from './pages/personal-center/personal-center.component';
import { SystemMessageComponent } from './pages/system-message/system-message.component';

// 服务
import { RbacService } from '../../rbac/rbac.service';


const routes: Routes = [
  {
    path: '',
    component: UcenterComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal-center',
      },
      {
        path: 'personal-center',
        component: PersonalCenterComponent,
        data: {
          title: '个人中心'
        }
      },
      {
        path: 'system-message',
        component: SystemMessageComponent,
        data: {
          title: '系统消息'
        }
      }
    ]
  }
];

export const UcenterRoutes: ModuleWithProviders = RouterModule.forChild(routes);


