import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 布局组件
import { MitLayoutComponent } from '../../widgets/mit-layout/mit-layout.component';

// 二级页面组件
import { BackendManagementComponent } from './backend-management.component';




const routes: Routes = [
  {
    path: '',
    component: BackendManagementComponent,
    data: {
      title: '后台管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'system-setting'
      },
      {
        path: 'system-setting',
        loadChildren: 'app/modules/backend-management/system-setting/system-setting.module#SystemSettingModule' // 系统设置
      },
      {
        path: 'product-manage',
        loadChildren: 'app/modules/backend-management/product-manage/product-manage.module#ProductManageModule' // 产品管理
      },
      {
        path: 'device-maintenance',
        loadChildren: 'app/modules/backend-management/device-maintenance/device-maintenance.module#DeviceMaintenanceModule' // 设备运维
      },
      {
        path: 'base-data',
        loadChildren: 'app/modules/backend-management/base-data/base-data.module#BaseDataModule' // 基础数据
      },
      {
        path: 'vehicle-management',
        loadChildren: 'app/modules/backend-management/vehicle-management/vehicle-management.module#VehicleManagementModule' // 车辆管理
      },
      {
        path: 'insurance-management',
        loadChildren: 'app/modules/backend-management/insurance-management/insurance-management.module#InsuranceManagementModule' // 保险管理
      },
      {
        path: 'ubi-model-management',
        loadChildren: 'app/modules/backend-management/ubi-model-management/ubi-model-management.module#UbiModelManagementModule' // ubi模型管理
      },
      {
        path: 'report-export',
        loadChildren: 'app/modules/backend-management/report-export/report-export.module#ReportExportModule' // 400报表导出
      },
      {
        path: 'security-alert',
        loadChildren: 'app/modules/backend-management/security-alert/security-alert.module#SecurityAlertModule' // 安全报警
      },
      {
        path: 'data-dictionary',
        loadChildren: 'app/modules/backend-management/data-dictionary/data-dictionary.module#DataDictionaryModule' // 数据字典
      }
    ]
  }
];

export const BackendManagementRoutes: ModuleWithProviders = RouterModule.forChild(routes);


