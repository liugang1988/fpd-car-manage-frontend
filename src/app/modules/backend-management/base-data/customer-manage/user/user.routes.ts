import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { ModifyComponent } from './modify/modify.component';



const routes: Routes = [ {
  path: '',
  component: UserComponent,
  data: {
    title: '用户管理'
  },
  children: [
    {
      path: '',
      component: ListComponent,
      data: {
        title: '用户管理'
      },
    },
    {
      path: 'add',
      component: ModifyComponent,
      data: {
        title: '新增用户'
      },
    },
    {
      path: 'edit/:UserId',
      component: ModifyComponent,
      data: {
        title: '编辑用户'
      },
    }
  ]
}
];

export const UserRoutes: ModuleWithProviders = RouterModule.forChild( routes );


