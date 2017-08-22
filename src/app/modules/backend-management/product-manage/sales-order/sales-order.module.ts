import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由注入
import { SalesOrderRoutes } from './sales-order.routes';

// 页面
import { SalesOrderComponent } from './sales-order.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
const page = [
  SalesOrderComponent,
  DetailComponent,
  ModifyComponent,
  ListComponent
];

// 服务
import { SalesOrderService } from './sales-order.service';

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
import { SelectModule } from '../../../../share/select/select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SupplierSelectModule,
  ProductNumberSelectModule,
  SelectModule,
  MitModalModule
];


@NgModule( {
  imports: [
    CommonModule,
    SalesOrderRoutes,
    ...mitModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ SalesOrderService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SalesOrderModule { }
