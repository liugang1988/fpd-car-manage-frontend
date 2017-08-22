import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
// 页面
import { ReportExportComponent } from './report-export.component';

// 路由
import { ReportExportRoutes } from './report-export.routes';

// 服务
import { ReportExportService } from './report-export.service';

// 公共组件
import { DepartmentSelectModule } from './../../../share/department-select/department-select.module';
import { OrganizationSelectModule } from './../../../share/organization-select/organization-select.module';
import { MitModalModule } from '../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  DepartmentSelectModule,
  OrganizationSelectModule,
  MitModalModule
];

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportExportRoutes,
    NgbDatepickerModule,
    ...mitModule
  ],
   declarations: [ReportExportComponent],
   providers: [ReportExportService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReportExportModule { };
