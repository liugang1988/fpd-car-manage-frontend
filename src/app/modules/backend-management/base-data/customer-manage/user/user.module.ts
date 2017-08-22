import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutes } from './user.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// 公共组件
import { RoleSelectModule } from '../../../../../share/role-select/role-select.module';
import { DepartmentSelectModule } from '../../../../../share/department-select/department-select.module';
import { MitDataTableModule } from '../../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../../widgets/mit-loading/mit-loading.module';
import { SelectModule } from './../../../../../share/select/select.module';
const mitModule = [
  RoleSelectModule,
  DepartmentSelectModule,
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SelectModule
];

// 客户管理
import { UserComponent } from './user.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
const userPages = [
  UserComponent,
  ListComponent,
  ModifyComponent,
  DeleteComponent
];


import { UserService } from './user.service';
import { AllotRoleComponent } from './allot-role/allot-role.component';
@NgModule( {
  imports: [
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserRoutes
  ],
  declarations: [
    ...userPages,
    AllotRoleComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
