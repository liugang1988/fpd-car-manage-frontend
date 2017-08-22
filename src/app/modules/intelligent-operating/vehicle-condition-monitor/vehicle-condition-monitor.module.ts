import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 路由注入
import { VehicleConditionMonitorRoutes } from './vehicle-condition-monitor.routes';


// 公用组件
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitEhartsModule } from '../../../widgets/mit-echarts/mit-echarts.module';
import { MitModalModule } from './../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from './../../../share/select/select.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  MitEhartsModule,
  MitModalModule,
  SelectModule,
  OrganizationTreeSelectModule
];

// 页面
import { VehicleConditionMonitorComponent } from './vehicle-condition-monitor.component';
import { ListComponent } from './list/list.component';
import { RemoteCheckComponent } from './remote-check/remote-check.component';
import { EngineCheckComponent } from './engine-check/engine-check.component';
import { ScanDetailComponent } from './scan-detail/scan-detail.component';
import { ScanRecordComponent } from './scan-record/scan-record.component';
const page = [
  VehicleConditionMonitorComponent,
  ListComponent,
  ScanDetailComponent,
  RemoteCheckComponent,
  EngineCheckComponent,
  ScanRecordComponent
];

// 服务
import { VehicleConditionMonitorService } from './vehicle-condition-monitor.service';


@NgModule({
  imports: [
    CommonModule,
    VehicleConditionMonitorRoutes,
    RouterModule,
    ...mitModule,
    FormsModule,
    NgbDatepickerModule
  ],
  declarations: [
    ...page
  ],
  providers: [VehicleConditionMonitorService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleConditionMonitorModule { }
