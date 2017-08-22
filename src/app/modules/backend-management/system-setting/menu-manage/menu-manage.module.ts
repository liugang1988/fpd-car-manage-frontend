import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// 第三方组件
import { TreeModule } from 'angular2-tree-component'; // 树组件

// 公用组件
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
const mitModule = [
  MitLoadingModule,
  MitAlertModule
];


// 路由注入
import { MenuManageRoutes } from './menu-manage.routes';


// 页面
import { MenuManageComponent } from './menu-manage.component';
import { ModifyComponent } from './modify/modify.component';
import { DeleteComponent } from './delete/delete.component';
import { TreeComponent } from './tree/tree.component';
const treePage = [
  MenuManageComponent,
  ModifyComponent,
  DeleteComponent,
  TreeComponent
];

// 菜单服务
import { MenuManageService } from './menu-manage.service';


// 权限控制模块
import { RbacModule } from '../../../../rbac/rbac.module';

@NgModule({
  declarations: [
    ...treePage
  ],
  imports: [
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    TreeModule,
    CommonModule,
    MenuManageRoutes,
    RbacModule
  ],
  providers: [MenuManageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuManageModule { };
