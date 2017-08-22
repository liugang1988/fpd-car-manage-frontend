import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// 部门管理
import { DepartmentManageComponent } from './department-manage.component';
import { TreeComponent } from './tree/tree.component';

// 服务
import { RbacService } from '../../../rbac/rbac.service';

const routes: Routes = [
  {
    path: '',
    component: DepartmentManageComponent,
    data: {
      title: '部门管理'
    },
    canActivate: [ RbacService ],
    children: [
      {
        path: '',
        component: TreeComponent
      }
    ]

  }
];

export const DepartmentManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


