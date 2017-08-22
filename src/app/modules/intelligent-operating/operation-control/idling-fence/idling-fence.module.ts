import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

import { IdlingFenceComponent } from './idling-fence.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  IdlingFenceComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent
];


// 公用模块
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitBaiduMapModule } from '../../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from '../../../../share/select/select.module';
import { OrganizationTreeSelectModule } from './../../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitLoadingModule,
  MitBaiduMapModule,
  MitAlertModule,
  MitDataTableModule,
  MitModalModule,
  SelectModule,
  OrganizationTreeSelectModule
];

// 服务
import { IdlingFenceService } from './idling-fence.service';

// 路由
import { IdlingFenceRoutes } from './idling-fence.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...mitModule,
    IdlingFenceRoutes,
    NgbDatepickerModule
  ],
  providers: [IdlingFenceService],
  declarations: [
    ...page
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IdlingFenceModule { }
