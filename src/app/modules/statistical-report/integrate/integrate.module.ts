import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 页面
import { IntegrateComponent } from './integrate.component';
import { ListComponent } from './list/list.component';
const page = [
  IntegrateComponent,
  ListComponent
];


// 服务
import { IntegrateService } from './integrate.service';

// 公用组件
import { MitEhartsModule } from '../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitEhartsModule,
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OrganizationTreeSelectModule
];

// 路由
import { IntegrateRoutes } from './integrate.routes';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule,
    IntegrateRoutes
  ],
  declarations: [ ...page ],
  providers: [ IntegrateService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class IntegrateModule { }
