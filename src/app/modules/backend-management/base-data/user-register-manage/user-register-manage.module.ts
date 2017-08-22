import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 页面
import { UserRegisterManageComponent } from './user-register-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DeleteComponent } from './delete/delete.component';
const page = [
  UserRegisterManageComponent,
  ListComponent,
  ModifyComponent,
  DeleteComponent
];

// 路由注入
import { UserRegisterManageRoutes } from './user-register-manage.routes';

// 权限控制模块
import { RbacModule } from '../../../../rbac/rbac.module';


// 公用组件
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from './../../../../share/select/select.module';
const mitModule = [
  MitAlertModule,
  MitDataTableModule,
  MitLoadingModule,
  MitModalModule,
  SelectModule
];


// 服务
import { UserRegisterManageService } from './user-register-manage.service';
import { DisposeComponent } from './dispose/dispose.component';


@NgModule({
  imports: [
    UserRegisterManageRoutes,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RbacModule,
    ...mitModule
  ],
  declarations: [
    ...page,
    DisposeComponent
  ],
  providers: [UserRegisterManageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserRegisterManageModule { }
