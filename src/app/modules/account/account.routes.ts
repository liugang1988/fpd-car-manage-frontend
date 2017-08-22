import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// 布局组件
import { MitLayoutComponent } from '../../widgets/mit-layout/mit-layout.component';

// 二级页面组件
import { AccountComponent } from './account.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPwComponent } from './pages/reset-pw/reset-pw.component';
import { CollectComponent} from './pages/collect/collect.component';




const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/account/login'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: '登录'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: '注册'
        }
      },
      {
        path: 'reset-pw',
        component: ResetPwComponent,
        data: {
          title: '重置密码'
        }
      },
      {
        path: 'collect',
        component: CollectComponent,
        data: {
          title: '用户登录'
        }
      }
    ],
  }
];

export const AccountRoutes: ModuleWithProviders = RouterModule.forChild(routes);


