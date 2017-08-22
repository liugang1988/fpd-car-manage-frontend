import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 服务
import { OperationalDataService } from './operational-data.service';

// 公用组件
import { MitEhartsModule } from '../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { OnlyYearMonthSelectModule } from './../../../share/only-year-month-select/only-year-month-select.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
import { MitModalModule } from './../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitEhartsModule,
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OnlyYearMonthSelectModule,
  OrganizationTreeSelectModule,
  MitModalModule
];

// 页面
import { OperationalDataComponent } from './operational-data.component';
import { ListComponent } from './list/list.component';
const page = [
  OperationalDataComponent,
  ListComponent
];

// 路由
import { OperationalDataRoutes } from './operational-data.routes';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule,
    OperationalDataRoutes
  ],
  declarations: [ ...page ],
  providers: [ OperationalDataService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OperationalDataModule { }
