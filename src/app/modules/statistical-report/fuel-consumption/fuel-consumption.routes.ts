import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';





// 二级页面组件
import { ListComponent } from './list/list.component';
import { FuelConsumptionComponent } from './fuel-consumption.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: FuelConsumptionComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,  // 油耗统计
        data: {
          title: '油耗统计'
        }
      },
      {
        path: 'detail/:VID/:time',
        component: DetailComponent,  // 油耗统计详情
        data: {
          title: '油耗统计详情'
        }
      }
    ]
  }
];

export const FuelConsumptionRoutes: ModuleWithProviders = RouterModule.forChild(routes);
