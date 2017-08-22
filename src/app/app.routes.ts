import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MitLayoutComponent } from './widgets/mit-layout/mit-layout.component';
import { RbacService } from './rbac/rbac.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/page/dashboard/vehicle-overview',
    pathMatch: 'full'
  },
  {
    path: 'page',
    component: MitLayoutComponent,
    canActivate: [RbacService],
    children: [
      { path: 'dashboard', loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule' },  // 运营首页
      { path: 'ucenter', loadChildren: 'app/modules/ucenter/ucenter.module#UcenterModule' }, // 用户中心
      { path: 'car-location/:state', loadChildren: 'app/modules/car-location/car-location.module#CarLocationModule' }, // 车辆位置
      { path: 'car-location', loadChildren: 'app/modules/car-location/car-location.module#CarLocationModule' }, // 车辆位置
      { path: 'base-data', loadChildren: 'app/modules/base-data/base-data.module#BaseDataModule' }, // 基础数据
      { path: 'intelligent-operating', loadChildren: 'app/modules/intelligent-operating/intelligent-operating.module#IntelligentOperatingModule' }, // 智能运营
      { path: 'vehicle-management', loadChildren: 'app/modules/vehicle-management/vehicle-management.module#VehicleManagementModule' }, // 车务管理
      { path: 'insurance-management', loadChildren: 'app/modules/insurance-management/insurance-management.module#InsuranceManagementModule' }, // 保险管理
      { path: 'statistical-report', loadChildren: 'app/modules/statistical-report/statistical-report.module#StatisticalReportModule' }, // 统计报表
      { path: 'system-setting', loadChildren: 'app/modules/system-setting/system-setting.module#SystemSettingModule' }, // 系统设置
      { path: 'backend-management', loadChildren: 'app/modules/backend-management/backend-management.module#BackendManagementModule' } // 后台管理
    ]
  },
  {  // 账号相关
    path: 'account',
    loadChildren: 'app/modules/account/account.module#AccountModule',
  },
  {
    path: 'event',
    loadChildren: 'app/modules/mobile-alarm/mobile-alarm.module#MobileAlarmModule' // 安全警报移动端处理
  },
  { path: 'error', loadChildren: 'app/modules/error/error.module#ErrorModule' }, // 错误
  { path: 'not-found', redirectTo: 'error/404' }, // 404
  { path: '**', redirectTo: 'error/404' } // 错误

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
