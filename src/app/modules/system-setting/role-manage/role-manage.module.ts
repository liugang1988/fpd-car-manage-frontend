import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 第三方组件
import { TreeModule } from 'angular2-tree-component'; // 树组件



// 公共组件
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitModalModule } from '../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  MitAlertModule,
  MitModalModule
];

// 服务
import { RoleManageService } from './role-manage.service';
const services = [
  RoleManageService,
];

// 路由
import { RoleManageRoutes } from './role-manage.routes';

// 页面
import { RoleManageComponent } from './role-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DeleteComponent } from './delete/delete.component';
import { AllotMenuComponent } from './allot-menu/allot-menu.component';
import { AllotActionsComponent } from './allot-actions/allot-actions.component';
const page = [
  RoleManageComponent,
  ListComponent,
  ModifyComponent,
  DeleteComponent,
  AllotMenuComponent,
  AllotActionsComponent
];


@NgModule({
  declarations: [
    ...page
  ],
  imports: [
    ...mitModule,
    TreeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RoleManageRoutes
  ],
  providers: [
    ...services
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoleManageModule { }
