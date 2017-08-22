
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 页面
import { ConventionInsuranceComponent } from './convention-insurance.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const page = [
  ConventionInsuranceComponent,
  ListComponent,
  DetailComponent
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
import { ConventionInsuranceRoutes } from './convention-insurance.routes';

// 服务
import { ConventionInsuranceService } from './convention-insurance.service';


@NgModule({
  imports: [
    CommonModule,
    ConventionInsuranceRoutes,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule
  ],
  declarations: [
    ...page

  ],
  providers: [ConventionInsuranceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConventionInsuranceModule { }
