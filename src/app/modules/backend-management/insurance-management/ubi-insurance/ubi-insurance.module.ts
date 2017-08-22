import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 页面
import { UbiInsuranceComponent } from './ubi-insurance.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { UbiListComponent } from './ubi-list/ubi-list.component';
import { UbiDetailComponent } from './ubi-detail/ubi-detail.component';

const page = [
  UbiInsuranceComponent,
  ListComponent,
  DetailComponent,
  UbiListComponent,
  UbiDetailComponent
];

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from './../../../../share/department-select/department-select.module';
import { OrganizationSelectModule } from './../../../../share/organization-select/organization-select.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { SelectModule } from './../../../../share/select/select.module';
import { MitBaiduMapModule } from '../../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { MitPipeModule } from './../../../../widgets/mit-pipe/mit-pipe.module';
import { MapEventFilterModule } from '../../../../share/map-event-filter/map-event-filter.module';
import { GradientPathIntroModule } from '../../../../share/gradient-path-intro/gradient-path-intro.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OrganizationSelectModule,
  MitAlertModule,
  SelectModule,
  MitBaiduMapModule,
  MitPipeModule,
  MapEventFilterModule,
  GradientPathIntroModule,
  MitModalModule
];

// 路由注入
import { UbiInsuranceRoutes } from './ubi-insurance.routes';

// 服务
import { UbiInsuranceService } from './ubi-insurance.service';
import { CreateUbiInsuranceComponent } from './create-ubi-insurance/create-ubi-insurance.component';



@NgModule({
  imports: [
    CommonModule,
    UbiInsuranceRoutes,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    ...mitModule
  ],
  declarations: [
    ...page,
    CreateUbiInsuranceComponent
  ],
  providers: [UbiInsuranceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UbiInsuranceModule { }
