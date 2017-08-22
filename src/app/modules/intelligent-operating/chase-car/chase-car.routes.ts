import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由
import { RbacService } from '../../../rbac/rbac.service';


// 页面
import { ChaseCarComponent } from './chase-car.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '',
    component: ChaseCarComponent,
    canActivate: [RbacService],
    data: {
      title: '追车管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'detail',
        component: DetailComponent,
        data: {
          title: '详情'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '添加'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '编辑'
        }
      }
    ]
  }
];

export const ChaseCarRoutes: ModuleWithProviders = RouterModule.forChild( routes );
