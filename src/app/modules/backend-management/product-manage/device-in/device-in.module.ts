import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 路由注入
import { DeviceOutRoutes } from './device-in.routes';

// 页面
import { DeviceInComponent } from './device-in.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { SimDetailComponent } from './sim-detail/sim-detail.component';
import { ObdDetailComponent } from './obd-detail/obd-detail.component';
const page = [
  DeviceInComponent,
  ListComponent,
  ModifyComponent,
  SimDetailComponent,
  ObdDetailComponent
];

// 服务
import { DeviceInService } from './device-in.service';


// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitUploadModule } from '../../../../widgets/mit-upload/mit-upload.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
import { FileUploadModule } from '../../../../share/file-upload/file-upload.module';
import { SelectModule } from '../../../../share/select/select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitUploadModule,
  MitLoadingModule,
  SupplierSelectModule,
  ProductNumberSelectModule,
  FileUploadModule,
  SelectModule,
  MitModalModule
];

@NgModule( {
  imports: [
    CommonModule,
    DeviceOutRoutes,
    RouterModule,
    ...mitModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ DeviceInService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DeviceInModule { }
