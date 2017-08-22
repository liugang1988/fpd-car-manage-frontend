import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 页面
import { ParamSettingComponent } from './param-setting.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ReadComponent } from './read/read.component';
const page = [
  ParamSettingComponent,
  ModifyComponent,
  ListComponent,
  DetailComponent,
  ReadComponent
];

// 服务
import { ParamSettingService } from './param-setting.service';

// 路由注入
import { ParamSettingRoutes } from './param-setting.routes';


// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { OrganizationSelectModule } from '../../../../share/organization-select/organization-select.module';
import { MitPipeModule } from '../../../../widgets/mit-pipe/mit-pipe.module';
import { SelectModule } from './../../../../share/select/select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  ProductNumberSelectModule,
  SupplierSelectModule,
  OrganizationSelectModule,
  MitPipeModule,
  SelectModule,
  MitModalModule
];


@NgModule({
  imports: [
    CommonModule,
    ParamSettingRoutes,
    RouterModule,
    ...mitModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ParamSettingService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParamSettingModule { }
