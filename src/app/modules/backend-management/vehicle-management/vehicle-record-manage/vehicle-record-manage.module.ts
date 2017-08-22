import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 页面
import { VehicleRecordManageComponent } from './vehicle-record-manage.component';
import { ListComponent } from './list/list.component';

const page = [
  VehicleRecordManageComponent,
  ListComponent
];

// 公用组件
import { MitEhartsModule } from '../../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from './../../../../share/department-select/department-select.module';
import { OrganizationSelectModule } from './../../../../share/organization-select/organization-select.module';
import { MitPipeModule } from './../../../../widgets/mit-pipe/mit-pipe.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitEhartsModule,
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OrganizationSelectModule,
  MitPipeModule,
  MitModalModule
];


// 路由注入
import { VehicleRecordManageRoutes } from './vehicle-record-manage.routes';

// 服务
import { VehicleRecordManageService } from './vehicle-record-manage.service';




@NgModule({
  imports: [
    CommonModule,
    VehicleRecordManageRoutes,
    ReactiveFormsModule,
    FormsModule,
    mitModule
  ],
  declarations: [
    ...page

  ],
  providers: [VehicleRecordManageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleRecordManageModule { }
