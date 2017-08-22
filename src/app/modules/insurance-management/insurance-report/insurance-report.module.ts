import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 服务
import { InsuranceReportService} from './insurance-report.service';

// 公共组件
import { SelectModule } from './../../../share/select/select.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  SelectModule
];

//  页面
import { InsuranceReportComponent } from './insurance-report.component';
import {ListComponent} from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

// 路由
import { InsuranceReportRoutes } from './insurance-report.routes';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceReportRoutes,
    ...mitModule
  ],
  declarations: [
    InsuranceReportComponent,
    ListComponent,
    ModifyComponent,
    DetailComponent
  ],
  providers: [InsuranceReportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsuranceReportModule { }
