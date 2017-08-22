import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// 页面
import { NameOfCarComponent } from './name-of-car.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
const page = [
  NameOfCarComponent,
  ListComponent,
  DetailComponent,
  ModifyComponent
];

// 公用模块
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitBaiduMapModule } from '../../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { DepartmentSelectModule } from '../../../../share/department-select/department-select.module';
const mitModule = [
  MitLoadingModule,
  MitBaiduMapModule,
  MitAlertModule,
  MitDataTableModule,
  DepartmentSelectModule
];

// 服务
import { NameOfCarService } from './name-of-car.service';


// 路由
import { NameOfCarRoutes } from './name-of-car.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...mitModule,
    NameOfCarRoutes
  ],
  declarations: [
    ...page
  ],
  providers: [NameOfCarService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NameOfCarModule { }
