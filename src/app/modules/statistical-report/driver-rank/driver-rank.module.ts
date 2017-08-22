import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 服务
import { DriverRankService } from './driver-rank.service';



// 页面
import { ListComponent } from './list/list.component';
import { DriverRankComponent } from './driver-rank.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  DriverRankComponent,
  ListComponent,
  DetailComponent
];


// 公用组件
import { MitEhartsModule } from '../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { OnlyYearMonthSelectModule } from './../../../share/only-year-month-select/only-year-month-select.module';
import { SelectModule } from './../../../share/select/select.module';
import { MitModalModule } from '../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitEhartsModule,
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OnlyYearMonthSelectModule,
  SelectModule,
  MitModalModule,
  OrganizationTreeSelectModule
];

// 路由
import { DriverRankRoutes } from './driving-rank.routes';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule,
    DriverRankRoutes
  ],
  providers: [ DriverRankService ],
  declarations: [ ...page ]
})
export class DriverRankModule { }
