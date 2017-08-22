import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由注入
import { ProductTypeRoutes } from './product-type.routes';


// 服务
import { ProductTypeService } from './product-type.service';


// 页面
import { ProductTypeComponent } from './product-type.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const page = [
  ProductTypeComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent
];

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SupplierSelectModule
];


// 权限控制模块
import { RbacModule } from '../../../../rbac/rbac.module';

@NgModule( {
  imports: [
    ...mitModule,
    CommonModule,
    FormsModule,
    ProductTypeRoutes,
    RbacModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ ProductTypeService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductTypeModule { }
