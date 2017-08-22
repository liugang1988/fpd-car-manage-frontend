import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { DeviceInComponent } from './device-in.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { SimDetailComponent } from './sim-detail/sim-detail.component';
import { ObdDetailComponent } from './obd-detail/obd-detail.component';



const routes: Routes = [
  {
    path: '',
    component: DeviceInComponent,
    data: {
      title: '设备入库'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'add/:type',
        component: ModifyComponent,
        data: {
          title: '设备入库'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
      },
      {
        path: 'sim/detail/:id',
        component: SimDetailComponent,
        data: {
          title: 'SIM入库明细'
        }
      },
      {
        path: 'obd/detail/:id',
        component: ObdDetailComponent,
        data: {
          title: '硬件入库明细'
        }
      }
    ]
  }
];

export const DeviceOutRoutes: ModuleWithProviders = RouterModule.forChild( routes );


