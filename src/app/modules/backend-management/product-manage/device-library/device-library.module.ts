import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

// 路由注入
import { DeviceOutRoutes } from './device-library.routes';

// 页面
import { DeviceLibraryComponent } from './device-library.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  DeviceLibraryComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent
];


// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { OrganizationSelectModule } from '../../../../share/organization-select/organization-select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from '../../../../share/select/select.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  OrganizationSelectModule,
  MitModalModule,
  SelectModule
];

// 服务
import { DeviceLibraryService } from './device-library.service';

@NgModule( {
  imports: [
    JsonpModule,
    CommonModule,
    DeviceOutRoutes,
    RouterModule,
    mitModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ DeviceLibraryService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DeviceLibraryModule { }
