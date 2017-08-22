import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';

// 二级页面组件
import { GuaranteeManagementComponent } from './guarantee-management.component';
import { ListComponent } from './list/list.component';
import { UbiDetailComponent } from './ubi-detail/ubi-detail.component';
import { UbiListComponent } from './ubi-list/ubi-list.component';
import { DetailComponent} from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: GuaranteeManagementComponent,
    canActivate: [RbacService],
    data: {
      title: '保单管理'
    },
    children: [
      {
        path: '',
        component: ListComponent  // 保单管理
      },
      {
        path: 'ubiList/:ID',
        component: UbiListComponent,  // UBI保单管理明细
        data: {
          title: 'UBI保单管理明细'
        }
      },
      {
        path: 'detail/:ID',
        component: DetailComponent,  // 保单详情
        data: {
          title: '保单详情'
        }
      },
      {
        path: 'ubiDetail/:ID',
        component: UbiDetailComponent,  // UBI保单详情
        data: {
          title: 'UBI保单详情'
        }
      }
    ]
  }
];

export const GuaranteeManagementRoutes: ModuleWithProviders = RouterModule.forChild(routes);
