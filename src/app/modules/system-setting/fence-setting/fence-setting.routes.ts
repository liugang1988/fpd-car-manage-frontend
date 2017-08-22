import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// 页面
import { FenceSettingComponent } from './fence-setting.component';


// 服务
import { RbacService } from '../../../rbac/rbac.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '栅栏设置'
    },
    component: FenceSettingComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        redirectTo: 'ncar'
      },
      {
        path: 'ncar',
        loadChildren: 'app/modules/system-setting/fence-setting/name-of-car/name-of-car.module#NameOfCarModule'  // 汽车点名(原时间栅栏)
      },
      {
        path: 'region',
        loadChildren: 'app/modules/system-setting/fence-setting/region-fence/region-fence.module#RegionFenceModule'  // 区域栅栏
      },
      {
        path: 'electric',
        loadChildren: 'app/modules/system-setting/fence-setting/electric-fence/electric-fence.module#ElectricFenceModule'  // 电子围栏
      },
      {
        path: 'idling',
        loadChildren: 'app/modules/system-setting/fence-setting/idling-fence/idling-fence.module#IdlingFenceModule' // 怠速栅栏
      },
      {
        path: 'fatigue',
        loadChildren: 'app/modules/system-setting/fence-setting/fatigue-driving/fatigue-driving.module#FatigueDrivingModule'  // 疲劳驾驶
      },
      {
        path: 'speed',
        loadChildren: 'app/modules/system-setting/fence-setting/speed-fence/speed-fence.module#SpeedFenceModule'  // 疲劳驾驶
      }
    ]
  }
];

export const FenceSettingRoutes: ModuleWithProviders = RouterModule.forChild(routes);


