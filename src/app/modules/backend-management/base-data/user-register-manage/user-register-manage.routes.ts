import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { UserRegisterManageComponent } from './user-register-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';



const routes: Routes = [
  {
    path: '',
    component: UserRegisterManageComponent,
    data: {
      title: '用户注册管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
      }
    ]
  }
];

export const UserRegisterManageRoutes: ModuleWithProviders = RouterModule.forChild(routes);


