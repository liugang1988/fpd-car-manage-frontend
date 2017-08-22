import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 封装组件
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
const mitModule = [
  MitLoadingModule,
  MitAlertModule
];


// 第三方模块，消息提示
import { TreeModule } from 'angular2-tree-component'; // 树组件

// 服务
import { DepartmentManageService } from './department-manage.service';
const services = [
  DepartmentManageService,
];



// 路由
import { DepartmentManageRoutes } from './department-manage.routes';

// 页面
import { DepartmentManageComponent } from './department-manage.component';
import { ModifyComponent } from './modify/modify.component';
import { DeleteComponent } from './delete/delete.component';
import { TreeComponent } from './tree/tree.component';
const page = [
  DepartmentManageComponent,
  ModifyComponent,
  DeleteComponent,
  TreeComponent
];




@NgModule({
  declarations: [
    ...page
  ],
  imports: [
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    TreeModule,
    CommonModule,
    DepartmentManageRoutes
  ],
  providers: [
    ...services
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DepartmentManageModule { };
