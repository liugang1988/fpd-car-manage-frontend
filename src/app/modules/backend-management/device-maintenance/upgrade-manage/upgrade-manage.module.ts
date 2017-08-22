import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';


// 页面
import { UpgradeManageComponent } from './upgrade-manage.component';
import { ListComponent } from './list/list.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { RecordComponent } from './record/record.component';

const page = [
  UpgradeManageComponent,
  ListComponent,
  UpgradeComponent,
  RecordComponent
];

// 路由注入
import { UpgradeManageRoutes } from './upgrade-manage.routes';


// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { OrganizationSelectModule } from '../../../../share/organization-select/organization-select.module';
import { VehicleSelectModule } from '../../../../share/vehicle-select/vehicle-select.module';
import { SoftwareVersionSelectModule } from '../../../../share/software-version-select/software-version-select.module';
import { SelectModule } from './../../../../share/select/select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  ProductNumberSelectModule,
  SupplierSelectModule,
  OrganizationSelectModule,
  VehicleSelectModule,
  SoftwareVersionSelectModule,
  SelectModule,
  MitModalModule
];


// 服务
import { UpgradeManageService } from './upgrade-manage.service';


@NgModule( {
  imports: [
    NgbDatepickerModule,
    CommonModule,
    UpgradeManageRoutes,
    ...mitModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ UpgradeManageService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UpgradeManageModule { }
