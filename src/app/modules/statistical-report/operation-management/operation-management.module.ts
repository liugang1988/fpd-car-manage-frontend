import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 服务
import { OperationManagementService } from './operation-management.service';

// 公用组件
import { MitEhartsModule } from '../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { OnlyYearMonthSelectModule } from '../../../share/only-year-month-select/only-year-month-select.module';
import { MitModalModule } from '../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitEhartsModule,
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OnlyYearMonthSelectModule,
  MitModalModule,
  OrganizationTreeSelectModule
];

// 页面
import { OperationManagementComponent } from './operation-management.component';
import { ListComponent } from './list/list.component';
const page = [
  OperationManagementComponent,
  ListComponent
];


// 路由
import { OperationManagementRoutes } from './operation-management.routes';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule,
    OperationManagementRoutes
  ],
  declarations: [ ...page ],
  providers: [ OperationManagementService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OperationManagementModule { }
