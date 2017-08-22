import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// 用户管理
import { UserManageComponent } from './user-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';

// 服务
import { RbacService } from '../../../rbac/rbac.service';

const routes: Routes = [
  {
    path: '',
    component: UserManageComponent,
    canActivate: [ RbacService ],
    data: {
      title: '用户管理'
    },
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增用户'
        }
      },
      {
        path: 'edit/:userId',
        component: ModifyComponent,
        data: {
          title: '编辑用户'
        }
      }
    ]
  }
];

export const UserManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


