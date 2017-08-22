import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';


// 页面
import { FatigueComponent } from './fatigue.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  FatigueComponent,
  ModifyComponent,
  ListComponent,
  DetailComponent
];



// 公用模块
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitBaiduMapModule } from '../../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { DepartmentSelectModule } from '../../../../share/department-select/department-select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitLoadingModule,
  MitBaiduMapModule,
  MitAlertModule,
  MitDataTableModule,
  DepartmentSelectModule,
  MitModalModule,
  OrganizationTreeSelectModule
];


// 路由注入
import { FatigueRoutes } from './fatigue.routes';

// 服务
import { FatigueService } from './fatigue.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...mitModule,
    FatigueRoutes,
    NgbDatepickerModule
  ],
  declarations: [
    ...page
  ],
  providers: [FatigueService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FatigueModule { }
