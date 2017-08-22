import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppVersionManageRoutes } from './app-version-manage.routes';
const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  AppVersionManageRoutes
];



// 公用模块
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitPipeModule } from '../../../../widgets/mit-pipe/mit-pipe.module';
import { SelectModule } from './../../../../share/select/select.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  MitPipeModule,
  SelectModule
];


// 组件
import { AppVersionManageComponent } from './app-version-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const components = [
  AppVersionManageComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent
];


// 服务
import { AppVersionManageService } from './app-version-manage.service';

@NgModule({
  imports: [
    CommonModule,
    ...modules,
    ...mitModule
  ],
  declarations: [
    ...components
  ],
  providers: [
    AppVersionManageService
  ]
})
export class AppVersionManageModule { }
