import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 公共组件
import { RoleSelectModule } from '../../../share/role-select/role-select.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitModalModule } from '../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
import { SelectModule } from './../../../share/select/select.module';
const mitModule = [
  RoleSelectModule,
  DepartmentSelectModule,
  MitDataTableModule,
  MitLoadingModule,
  MitAlertModule,
  MitModalModule,
  OrganizationTreeSelectModule,
  SelectModule
];

// 服务
import { UserManageService } from './user-manage.service';
const services = [
  UserManageService,
];

// 路由
import { UserManageRoutes } from './user-manage.routes';

// 页面
import { UserManageComponent } from './user-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { AllotRoleComponent } from './allot-role/allot-role.component';
const page = [
  UserManageComponent,
  ListComponent,
  ModifyComponent
];


@NgModule( {
  declarations: [
    ...page,
    AllotRoleComponent
  ],
  imports: [
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserManageRoutes
  ],
  providers: [
    ...services
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserManageModule { };
