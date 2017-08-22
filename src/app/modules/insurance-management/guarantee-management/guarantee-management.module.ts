import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 服务
import { GuaranteeManagementService } from './guarantee-management.service';

// 公共组件
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { OrganizationSelectModule } from '../../../share/organization-select/organization-select.module';
import { SelectModule } from '../../../share/select/select.module';
import { MitBaiduMapModule } from '../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { MitPipeModule } from './../../../widgets/mit-pipe/mit-pipe.module';
import { MapEventFilterModule } from '../../../share/map-event-filter/map-event-filter.module';
import { GradientPathIntroModule } from '../../../share/gradient-path-intro/gradient-path-intro.module';
import { MitModalModule } from '../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  DepartmentSelectModule,
  OrganizationSelectModule,
  MitBaiduMapModule,
  SelectModule,
  MitPipeModule,
  MapEventFilterModule,
  GradientPathIntroModule,
  MitModalModule,
  OrganizationTreeSelectModule
];

//路由
import { GuaranteeManagementRoutes } from './guarantee-management.routes';

//  页面
import { GuaranteeManagementComponent } from './guarantee-management.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { UbiDetailComponent } from './ubi-detail/ubi-detail.component';
import { UbiListComponent } from './ubi-list/ubi-list.component';
const page = [
  GuaranteeManagementComponent,
  ListComponent,
  DetailComponent,
  UbiListComponent,
  UbiDetailComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GuaranteeManagementRoutes,
    NgbDatepickerModule,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [GuaranteeManagementService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuaranteeManagementModule { }
