import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 页面
import { VehicleSeriesManageComponent } from './vehicle-series-manage.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
const page = [
  VehicleSeriesManageComponent,
  ListComponent,
  AddComponent
]

// 服务
import { VehicleSeriesManageService } from './vehicle-series-manage.service';

// 路由
import { VehicleSeriesManageRoutes } from './vehicle-series-manage.routes';

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from './../../../../share/select/select.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  MitModalModule,
  SelectModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    VehicleSeriesManageRoutes,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [VehicleSeriesManageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleSeriesManageModule { }
