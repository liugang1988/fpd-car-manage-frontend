import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../rbac/rbac.service';



// 页面组件
import { InsuranceManagementComponent } from './insurance-management.component';



const routes: Routes = [
  {
    path: '',
    component: InsuranceManagementComponent,
    data: {
      title: '保险管理'
    },
    canActivate: [RbacService],
    children: [
      {
        path: '',
        redirectTo: 'guarantee-management',
      },
      {
        path: 'guarantee-management',
        loadChildren: 'app/modules/insurance-management/guarantee-management/guarantee-management.module#GuaranteeManagementModule' // 保单管理
      },
      {
        path: 'insurance-report',
        loadChildren: 'app/modules/insurance-management/insurance-report/insurance-report.module#InsuranceReportModule'  // 出险记录
      },
      {
        path: 'car-location',
        loadChildren: 'app/modules/insurance-management/car-location/car-location.module#CarLocationModule'  // 车辆位置
      }
    ]
  }
];

export const InsuranceManagementRoutes: ModuleWithProviders = RouterModule.forChild(routes);
