import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// 路由
import { StatisticalReportRoutes } from './statistical-report.routes';

//  页面
import { StatisticalReportComponent } from './statistical-report.component';


@NgModule({
  declarations: [
    StatisticalReportComponent
  ],
  imports: [
    CommonModule,
    StatisticalReportRoutes
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatisticalReportModule { };
