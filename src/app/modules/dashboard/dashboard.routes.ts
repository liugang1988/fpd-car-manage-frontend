import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 服务
import { RbacService } from '../../rbac/rbac.service';

// 页面
import { VehicleOverviewComponent } from './pages/vehicle-overview/vehicle-overview.component';
import { VehicleManagementComponent } from './pages/vehicle-management/vehicle-management.component';
import { DriverManagementComponent } from './pages/driver-management/driver-management.component';

// 二级页面组件
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [ RbacService ],
    data: {
      title: '首页'
    },
    children: [
      {
        path: '',
        redirectTo: 'vehicle-overview'
      },
      {
        path: 'vehicle-overview',
        component: VehicleOverviewComponent,
        // canActivate: [ RbacService ],
        data: {
          title: '车辆概况'
        }
      },
      {
        path: 'driver-management',
        component: DriverManagementComponent,
        // canActivate: [ RbacService ],
        data: {
          title: '驾驶员管理'
        }
      }
      // ,
      // {
      //   path: 'vehicle-management',
      //   component: VehicleManagementComponent,
      //   // canActivate: [ RbacService ],
      //   data: {
      //     title: '车务管理'
      //   }
      //}
    ]
  }
];

export const DashboardRoutes: ModuleWithProviders = RouterModule.forChild( routes );
