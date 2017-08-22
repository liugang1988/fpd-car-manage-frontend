import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// 路由注入
import { LogininLogRoutes } from './login-log.routes';

// 页面
import { LoginLogComponent } from './login-log.component';
import { ListComponent } from './list/list.component';

const page = [
  LoginLogComponent,
  ListComponent
];

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitModalModule } from './../../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from './../../../../share/select/select.module';
import { OrganizationTreeSelectModule } from './../../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  MitModalModule,
  SelectModule,
  OrganizationTreeSelectModule
];


// 服务
import { LoginLogService } from './login-log.service';

@NgModule({
  imports: [
    CommonModule,
    LogininLogRoutes,
    ...mitModule,
    FormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [LoginLogService]
})
export class LoginLogModule { }
