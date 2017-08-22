import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 路由注入
import { DeviceInstallationRoutes } from './device-installation.routes';


// 服务
import { DeviceInstallationService } from './device-installation.service';

// 页面
import { DeviceInstallationComponent } from './device-installation.component';
import { ListComponent } from './list/list.component';
import { BindComponent } from './bind/bind.component';

const page = [
  DeviceInstallationComponent,
  ListComponent,
  BindComponent
];

// 公用组件
import { MitUploadModule } from './../../../widgets/mit-upload/mit-upload.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitModalModule } from './../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
import { SelectModule } from './../../../share/select/select.module';
const mitModule = [
  MitDataTableModule,
  DepartmentSelectModule,
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  MitUploadModule,
  MitModalModule,
  OrganizationTreeSelectModule,
  SelectModule
];

// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';
import { RecordComponent } from './record/record.component';
@NgModule( {
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RbacModule,
    DeviceInstallationRoutes,
    ...mitModule
  ],
  declarations: [
    ...page,
    RecordComponent,
  ],
  providers: [ DeviceInstallationService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DeviceInstallationModule { }
