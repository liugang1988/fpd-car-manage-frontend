import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';




// 二级页面组件
import { InsuranceReportComponent } from './insurance-report.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: InsuranceReportComponent,
    canActivate: [RbacService],
    data: {
      title: '出险记录'
    },
    children: [
      {
        path: '',
        component: ListComponent,  // 出险记录
        data: {
          title: '出险记录'
        }
      },
      {
        path: 'modify',
        component: ModifyComponent,  // 出险登记
        data: {
          title: '出险登记'
        }
      },
      {
        path: 'detail/:ID',
        component: DetailComponent,  // 出险详情
        data: {
          title: '出险详情'
        }
      }
    ]
  }
];

export const InsuranceReportRoutes: ModuleWithProviders = RouterModule.forChild(routes);
