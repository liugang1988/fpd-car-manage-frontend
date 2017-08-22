import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由注入
import { ChaseCarRoutes } from './chase-car.routes';


// 页面
import { ChaseCarComponent } from './chase-car.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
const page = [
  ChaseCarComponent,
  ListComponent,
  DetailComponent,
  ModifyComponent
];


// 公用组件
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule
];

// 服务

import { ChaseCarService } from './chase-car.service';


@NgModule( {
  imports: [
    CommonModule,
    ChaseCarRoutes,
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    ...page
  ],
  providers: [ ChaseCarService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ChaseCarModule { }
