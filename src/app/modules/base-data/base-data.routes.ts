import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 二级页面组件
import { BaseDataComponent } from './base-data.component';




const routes: Routes = [
  {
    path: '',
    component: BaseDataComponent,
    data: {
      title: '基础数据'
    },
    children: [
      { path: '', redirectTo: 'vehicle-information' },
      { path: 'vehicle-information', loadChildren: 'app/modules/base-data/vehicle-information/vehicle-information.module#VehicleInformationModule' },
      { path: 'people-car-binding', loadChildren: 'app/modules/base-data/people-car-binding/people-car-binding.module#PeopleCarBindingModule' },
      { path: 'driver-manage', loadChildren: 'app/modules/base-data/driver-manage/driver-manage.module#DriverManageModule' },
      { path: 'device-install', loadChildren: 'app/modules/base-data/device-installation/device-installation.module#DeviceInstallationModule' }
    ]
  }
];

export const BaseDataRoutes: ModuleWithProviders = RouterModule.forChild( routes );
