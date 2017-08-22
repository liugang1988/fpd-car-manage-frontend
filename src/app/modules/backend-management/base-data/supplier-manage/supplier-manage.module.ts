
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由注入
import { SupplierManageRoutes } from './supplier-manage.route';


// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitUploadModule } from '../../../../widgets/mit-upload/mit-upload.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';

const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitUploadModule,
  MitLoadingModule
];

// 权限控制模块
import { RbacModule } from '../../../../rbac/rbac.module';


// 服务
import { SupplierManageService } from './supplier-manage.service';

// 页面
import { SupplierManageComponent } from './supplier-manage.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { DeleteComponent } from './delete/delete.component';
const page = [
  SupplierManageComponent,
  ListComponent,
  DetailComponent,
  ModifyComponent,
  DeleteComponent
];

@NgModule( {
  imports: [
    SupplierManageRoutes,
    CommonModule,
    RbacModule,
    ReactiveFormsModule,
    FormsModule,
    mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [ SupplierManageService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SupplierManageModule { }
