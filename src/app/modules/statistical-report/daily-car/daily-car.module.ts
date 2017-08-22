import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 服务
import { DailyCarService } from './daily-car.service';



// 页面
import { ListComponent } from './list/list.component';
import { DailyCarComponent } from './daily-car.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  DailyCarComponent,
  ListComponent,
  DetailComponent
];


// 公用组件
import { MitEhartsModule } from '../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { OnlyYearMonthSelectModule } from '../../../share/only-year-month-select/only-year-month-select.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
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
import { DailyCarRoutes } from './daily-car.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule,
    DailyCarRoutes
  ],
  providers: [DailyCarService],
  declarations: [...page]
})
export class DailyCarModule { }
