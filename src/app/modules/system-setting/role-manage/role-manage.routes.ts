import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RoleManageComponent } from './role-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';

// 服务
import { RbacService } from '../../../rbac/rbac.service';


const routes: Routes = [
  {
    path: '',
    data: {
      title: '角色管理'
    },
    canActivate: [ RbacService ],
    component: RoleManageComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增角色'
        }
      },
      {
        path: 'edit/:roleId',
        component: ModifyComponent,
        data: {
          title: '编辑角色'
        }
      }
    ]
  }
];

export const RoleManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


