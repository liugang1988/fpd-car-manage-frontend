import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 页面
import { VehicleInstallComponent } from './vehicle-install.component';
import { ListComponent } from './list/list.component';
import { BindComponent } from './bind/bind.component';
import { UnbindComponent } from './unbind/unbind.component';
import { RecordComponent } from './record/record.component';
const page = [
  VehicleInstallComponent,
  ListComponent,
  BindComponent,
  UnbindComponent,
  RecordComponent
];

// 服务
import { VehicleInstallService } from './vehicle-install.service';


// 路由注入
import { VehicleInstallRoutes } from './vehicle-install.routes';


// 公用组件
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { DepartmentSelectModule } from '../../../../share/department-select/department-select.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from '../../../../share/select/select.module';
import { OrganizationTreeSelectModule } from '../../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  DepartmentSelectModule,
  MitDataTableModule,
  MitAlertModule,
  ProductNumberSelectModule,
  SupplierSelectModule,
  MitLoadingModule,
  MitModalModule,
  SelectModule,
  OrganizationTreeSelectModule
];

@NgModule({
  imports: [
    CommonModule,
    VehicleInstallRoutes,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [VehicleInstallService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleInstallModule { }
