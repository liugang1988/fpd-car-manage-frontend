import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 服务
import { FuelConsumptionService } from './fuel-consumption.service';

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
import { FuelConsumptionComponent } from './fuel-consumption.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  FuelConsumptionComponent,
  ListComponent,
  DetailComponent
];


// 路由
import { FuelConsumptionRoutes } from './fuel-consumption.routes';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule,
    FuelConsumptionRoutes
  ],
  declarations: [ ...page ],
  providers: [ FuelConsumptionService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuelConsumptionModule { }
