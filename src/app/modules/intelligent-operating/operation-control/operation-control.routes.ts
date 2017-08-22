import { ElectricFenceModule } from './electric-fence/electric-fence.module';
import { FenceSettingModule } from './../../system-setting/fence-setting/fence-setting.module';
import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由
import { RbacService } from '../../../rbac/rbac.service';


// 页面
import { OperationControlComponent } from './operation-control.component';



const routes: Routes = [
  {
    path: '',
    component: OperationControlComponent,
    canActivate: [RbacService],
    data: {
      title: '运行管控'
    },
    children: [
      {
        path: 'electric',
        loadChildren: 'app/modules/intelligent-operating/operation-control/electric-fence/electric-fence.module#ElectricFenceModule' // 电子围栏
      },
      {
        path: 'idling',
        loadChildren: 'app/modules/intelligent-operating/operation-control/idling-fence/idling-fence.module#IdlingFenceModule' // 电子围栏
      },
      {
        path: 'region',
        loadChildren: 'app/modules/intelligent-operating/operation-control/region-fence/region-fence.module#RegionFenceModule' // 电子围栏
      },
      {
        path: 'speed',
        loadChildren: 'app/modules/intelligent-operating/operation-control/speed-fence/speed-fence.module#SpeedFenceModule' // 电子围栏
      },
      {
        path: 'fatigue',
        loadChildren: 'app/modules/intelligent-operating/operation-control/fatigue/fatigue.module#FatigueModule' // 疲劳驾驶
      },
      {
        path: 'name-of-car',
        loadChildren: 'app/modules/intelligent-operating/operation-control/name-of-car/name-of-car.module#NameOfCarModule' // 汽车点名
      }
    ]
  }
];

export const OperationControlRoutes: ModuleWithProviders = RouterModule.forChild(routes);
