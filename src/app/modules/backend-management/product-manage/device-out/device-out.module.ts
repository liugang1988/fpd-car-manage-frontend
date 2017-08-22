import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 路由注入
import { DeviceOutRoutes } from './device-out.routes';


// 页面
import { DeviceOutComponent } from './device-out.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  DeviceOutComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent
];

// 管道
import { MitPipeModule } from '../../../../widgets/mit-pipe/mit-pipe.module';


// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
import { FileUploadModule } from '../../../../share/file-upload/file-upload.module';
import { SelectModule} from '../../../../share/select/select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SupplierSelectModule,
  ProductNumberSelectModule,
  FileUploadModule,
  SelectModule,
  MitModalModule
];

// 服务
import { DeviceOutService } from './device-out.service';

@NgModule( {
  imports: [
    CommonModule,
    DeviceOutRoutes,
    MitPipeModule,
    RouterModule,
    ...mitModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [
    ...page
  ],
  providers: [ DeviceOutService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DeviceOutModule { }
