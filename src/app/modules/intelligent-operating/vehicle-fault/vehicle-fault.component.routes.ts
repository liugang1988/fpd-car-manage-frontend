import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由


// 页面
import { VehicleConditionMonitorModule } from '../vehicle-condition-monitor/vehicle-condition-monitor.module';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '',
    component: VehicleConditionMonitorModule,
    data: {
      title: '车况监控'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '详情'
        }
      }
    ]
  }
];

export const VehicleConditionMonitorRoutes: ModuleWithProviders = RouterModule.forChild(routes);


