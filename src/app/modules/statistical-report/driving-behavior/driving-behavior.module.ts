import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 服务
import { DrivingBehaviorService } from './driving-behavior.service';


// 页面
import { ListComponent } from './list/list.component';
import { DrivingBehaviorComponent } from './driving-behavior.component';
const page = [
  DrivingBehaviorComponent,
  ListComponent
];


// 公用组件
import { MitEhartsModule } from '../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { OnlyYearMonthSelectModule } from './../../../share/only-year-month-select/only-year-month-select.module';
import { OrganizationSelectModule } from './../../../share/organization-select/organization-select.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { SelectModule } from './../../../share/select/select.module';
import { VehicleSelectModule } from './../../../share/vehicle-select/vehicle-select.module';
import { MitModalModule } from '../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitEhartsModule,
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OnlyYearMonthSelectModule,
  OrganizationSelectModule,
  SelectModule,
  VehicleSelectModule,
  MitModalModule,
  OrganizationTreeSelectModule
];

// 路由
import { DrivingBehaviorRoutes } from './driving-behavior.routes';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule,
    DrivingBehaviorRoutes
  ],
  declarations: [ ...page ],
  providers: [ DrivingBehaviorService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DrivingBehaviorModule { }
