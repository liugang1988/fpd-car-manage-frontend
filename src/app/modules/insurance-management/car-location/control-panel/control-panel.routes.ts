import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../../rbac/rbac.service';

// 二级页面组件
import { ControlPanelComponent } from './control-panel.component';


const routes: Routes = [
  {
    path: '',
    component: ControlPanelComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        redirectTo: 'single-vehicle'
      },
      {
        path: 'single-vehicle',
        loadChildren: 'app/modules/insurance-management/car-location/control-panel/single-vehicle/single-vehicle.module#SingleVehicleModule', // 单车信息
        data: {
          title: '单车信息'
        }
      },
      {
        path: 'real-time',
        loadChildren: 'app/modules/insurance-management/car-location/control-panel/real-time/real-time.module#RealTimeModule',  // 实时轨迹
        data: {
          title: '实时轨迹'
        }
      },
      {
        path: 'history-track',
        loadChildren: 'app/modules/insurance-management/car-location/control-panel/history-track/history-track.module#HistoryTrackModule',  // 历史追踪
        data: {
          title: '历史追踪'
        }
      }
    ]
  }
];

export const ControlPanelRoutes: ModuleWithProviders = RouterModule.forChild(routes);




