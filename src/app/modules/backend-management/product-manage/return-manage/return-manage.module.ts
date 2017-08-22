import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// 路由
import { ReturnManageRoutes } from './return-manage.routes';

// 页面
import { ReturnManageComponent } from './return-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  ReturnManageComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent
];

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SupplierSelectModule,
  ProductNumberSelectModule
];


import { ReturnManageService } from './return-manage.service';

@NgModule( {
  imports: [
    CommonModule,
    ...mitModule,
    ReturnManageRoutes,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ ReturnManageService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReturnManageModule { }
