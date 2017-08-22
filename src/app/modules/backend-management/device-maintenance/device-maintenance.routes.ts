import { WorkConditionModule } from './work-condition/work-condition.module';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// 二级页面组件
import { DeviceMaintenanceComponent } from './device-maintenance.component';




const routes: Routes = [
  {
    path: '',
    component: DeviceMaintenanceComponent,
    data: {
      title: '设备运维'
    },
    children: [
      {
        path: 'work-condition',
        loadChildren: 'app/modules/backend-management/device-maintenance/work-condition/work-condition.module#WorkConditionModule' // 设备工作状态
      },
      {
        path: 'upgrade-manage',
        loadChildren: 'app/modules/backend-management/device-maintenance/upgrade-manage/upgrade-manage.module#UpgradeManageModule' // 设备升级管理
      },
      {
        path: 'param-setting',
        loadChildren: 'app/modules/backend-management/device-maintenance/param-setting/param-setting.module#ParamSettingModule' // 设备参数设置
      },
      {
        path: 'vehicle-install',
        loadChildren: 'app/modules/backend-management/device-maintenance/vehicle-install/vehicle-install.module#VehicleInstallModule' // 车辆安装管理
      },
    ]
  }
];

export const DeviceMaintenanceRoutes: ModuleWithProviders = RouterModule.forChild( routes );


