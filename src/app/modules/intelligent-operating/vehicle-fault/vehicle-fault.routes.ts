
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';


// 页面组件
import { VehicleFaultComponent } from './vehicle-fault.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';





const routes: Routes = [
  {
    path: '',
    component: VehicleFaultComponent,
    canActivate: [RbacService],
    data: {
      title: '车况监控'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '故障提示'
        }
      },
      {
        path: 'detail/:vid',
        component: DetailComponent,
        data: {
          title: '故障详情'
        }
      }
    ]
  }
];

export const VehicleFaultRoutes: ModuleWithProviders = RouterModule.forChild(routes);
