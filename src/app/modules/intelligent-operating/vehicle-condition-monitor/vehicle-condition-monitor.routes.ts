
import { ModuleWithProviders } from '@angular/core';  // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由
import { RbacService } from '../../../rbac/rbac.service';



// 页面
import { VehicleConditionMonitorComponent } from './vehicle-condition-monitor.component';
import { ListComponent } from './list/list.component';
import { RemoteCheckComponent } from './remote-check/remote-check.component';
import { EngineCheckComponent } from './engine-check/engine-check.component';
import { ScanDetailComponent } from './scan-detail/scan-detail.component';
import { ScanRecordComponent } from './scan-record/scan-record.component';
const routes: Routes = [
  {
    path: '',
    component: VehicleConditionMonitorComponent,
    data: {
      title: '车况监控'
    },
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'record/:did/:vid',
        component: ScanRecordComponent,
        data: {
          title: '扫描记录'
        }
      },
      {
        path: 'detail/:checkid',
        component: ScanDetailComponent,
        data: {
          title: '扫描详情'
        }
      },
      {
        path: 'remote/:did/:vid',
        component: RemoteCheckComponent,
        data: {
          title: '远程扫描'
        }
      },
      {
        path: 'engine/:did/:vid',
        component: EngineCheckComponent,
        data: {
          title: '发动机检测'
        }
      }
    ]
  }
];

export const VehicleConditionMonitorRoutes: ModuleWithProviders = RouterModule.forChild(routes);


