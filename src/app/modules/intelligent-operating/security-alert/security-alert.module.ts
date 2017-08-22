import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

// 路由注入
import { SecurityAlertRoutes } from './security-alert.routes';


// 页面
import { SecurityAlertComponent } from './security-alert.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { EventHandingComponent } from './event-handing/event-handing.component';
const page = [
  SecurityAlertComponent,
  ListComponent,
  DetailComponent,
  EventHandingComponent
];


// 公用组件
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitBaiduMapModule } from '../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { AlertRecordEnumCheckboxModule } from '../../../share/alert-record-enum-checkbox/alert-record-enum-checkbox.module';
import { MitModalModule } from './../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from './../../../share/select/select.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
import { MitPipeModule } from './../../../widgets/mit-pipe/mit-pipe.module';
const mitModule = [
  MitBaiduMapModule,
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  AlertRecordEnumCheckboxModule,
  MitModalModule,
  SelectModule,
  OrganizationTreeSelectModule,
  MitPipeModule
];

// 服务
import { SecurityAlertService } from './security-alert.service';

@NgModule({
  imports: [
    CommonModule,
    SecurityAlertRoutes,
    RouterModule,
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    JsonpModule
  ],
  declarations: [
    ...page
  ],
  providers: [SecurityAlertService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurityAlertModule { }
