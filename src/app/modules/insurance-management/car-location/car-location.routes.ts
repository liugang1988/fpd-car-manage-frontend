import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';



// 二级页面组件
import { CarLocationComponent } from './car-location.component';
const routes: Routes = [
  {
    path: '',
    component: CarLocationComponent,
    canActivate: [RbacService],
    data: {
      title: '车辆位置'
    },
    children: [
      {
        path: 'control/:Did',
        loadChildren: 'app/modules/insurance-management/car-location/control-panel/control-panel.module#ControlPanelModule', //  控制面板
      }
    ]
  }
];

export const CarLocationRoutes: ModuleWithProviders = RouterModule.forChild(routes);




