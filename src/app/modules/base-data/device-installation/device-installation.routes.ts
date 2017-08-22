import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DeviceInstallationComponent } from './device-installation.component';


// 二级页面组件
import { ListComponent } from './list/list.component';
import { RecordComponent } from './record/record.component';


// 服务
import { RbacService } from '../../../rbac/rbac.service';

const routes: Routes = [
  {
    path: '',
    component: DeviceInstallationComponent,
    data: {
      title: '设备安装'
    },
    canActivate: [ RbacService ],
    children: [
      {
        path: '',
        component: ListComponent,
      }
    ]
  }
];

export const DeviceInstallationRoutes: ModuleWithProviders = RouterModule.forChild( routes );
