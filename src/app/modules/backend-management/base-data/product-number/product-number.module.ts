import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// 服务
import { ProductNumberService } from './product-number.service';


// 路由注入
import { ProductNumberRoutes } from './product-number.routes';

// 页面
import { ProductNumberComponent } from './product-number.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteComponent } from './delete/delete.component';
const page = [
  ProductNumberComponent,
  ModifyComponent,
  ListComponent,
  DetailComponent,
  DeleteComponent
];


// 权限控制模块
import { RbacModule } from '../../../../rbac/rbac.module';

// 公用模块
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { MitPipeModule } from '../../../../widgets/mit-pipe/mit-pipe.module';
import { SelectModule } from './../../../../share/select/select.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SupplierSelectModule,
  MitPipeModule,
  SelectModule
];

@NgModule({
  imports: [
    ...mitModule,
    CommonModule,
    ProductNumberRoutes,
    RbacModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ ProductNumberService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ProductNumberModule { }
