import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../../rbac/rbac.service';

// 页面
import { UbiModelComponent } from './ubi-model.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: UbiModelComponent,
    canActivate: [RbacService],
    data: {
      title: 'UBI模型'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'detail/:ID',
        component: DetailComponent,
        data: {
          title: '详情'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新建模型'
        }
      },
      {
        path: 'edit/:ID',
        component: ModifyComponent,
        data: {
          title: '修改模型'
        }
      }
    ]
  }
];

export const UbiModelRoutes: ModuleWithProviders = RouterModule.forChild( routes );


