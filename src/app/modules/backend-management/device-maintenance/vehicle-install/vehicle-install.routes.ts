import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { VehicleInstallComponent } from './vehicle-install.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '',
    component: VehicleInstallComponent,
    data: {
      title: '车辆安装'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      }
    ]
  }
];

export const VehicleInstallRoutes: ModuleWithProviders = RouterModule.forChild( routes );


