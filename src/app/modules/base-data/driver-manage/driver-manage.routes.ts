import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DriverManageComponent } from './driver-manage.component';


// 二级页面组件
import { ModifyComponent } from './modify/modify.component'; // 添加，编辑
import { DetailComponent } from './detail/detail.component'; // 详情页面
import { ListComponent } from './list/list.component'; // 表格数据
import { KpiDetailComponent } from './kpi-detail/kpi-detail.component';
import { AccessFileComponent } from './access-file/access-file.component';

// 服务
import { RbacService } from '../../../rbac/rbac.service';


const routes: Routes = [
  {
    path: '',
    component: DriverManageComponent,
    data: {
      title: '司机管理'
    },
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '司机管理'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '编辑司机档案'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增司机档案'
        }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '司机档案详情'
        }
      },
      {
        path: 'kpi/:id',
        component: KpiDetailComponent,
        data: {
          title: '驾驶员KPI考核报表'
        }
      },
      {
        path: 'access/:id',
        component: AccessFileComponent,
        data: {
          title: '驾驶员评估档案'
        }
      }
    ]
  }
];

export const DriverManageRoutes: ModuleWithProviders = RouterModule.forChild(routes);
