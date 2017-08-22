import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 页面
import { InsurancePriceComponent } from './insurance-price.component';
import { InsuranceProjectComponent } from './insurance-project/insurance-project.component';
import { PriceResultComponent } from './price-result/price-result.component';
import { VehicleInforComponent } from './vehicle-infor/vehicle-infor.component';

const page = [
  InsurancePriceComponent,
  InsuranceProjectComponent,
  PriceResultComponent,
  VehicleInforComponent
];

// 公用组件
import { MitEhartsModule } from '../../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from '../../../../share/department-select/department-select.module';
import { OrganizationSelectModule } from '../../../../share/organization-select/organization-select.module';
import { SelectModule } from '../../../../share/select/select.module';
const mitModule = [
  MitEhartsModule,
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OrganizationSelectModule,
  SelectModule
];


// 路由注入
import { InsurancePriceRoutes } from './insurance-price.routes';

// 服务
import { InsurancePriceService } from './insurance-price.service';



@NgModule({
  imports: [
    CommonModule,
    InsurancePriceRoutes,
    ReactiveFormsModule,
    FormsModule,
    ...mitModule,
    NgbDatepickerModule
  ],
  declarations: [
    ...page
  ],
  providers: [InsurancePriceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsurancePriceModule { }
