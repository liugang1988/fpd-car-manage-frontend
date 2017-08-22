import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';


// 路由注入
import { SoftwareVersionRoutes } from './software-version.routes';

// 页面
import { SoftwareVersionComponent } from './software-version.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { DeleteComponent } from './delete/delete.component';
const page = [
  SoftwareVersionComponent,
  ListComponent,
  DetailComponent,
  ModifyComponent,
  DeleteComponent
];


// 服务
import { SoftwareVersionService } from './software-version.service';


// 权限控制模块
import { RbacModule } from '../../../../rbac/rbac.module';


// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
import { MitPipeModule } from '../../../../widgets/mit-pipe/mit-pipe.module';
import { SelectModule } from './../../../../share/select/select.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SupplierSelectModule,
  ProductNumberSelectModule,
  MitPipeModule,
  SelectModule
];


@NgModule({
  imports: [
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SoftwareVersionRoutes,
    RbacModule,
    RouterModule,
    NgbDatepickerModule
  ],
  declarations: [
    ...page
  ],
  providers: [SoftwareVersionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoftwareVersionModule { }
