import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 页面
import { ElectricFenceComponent } from './electric-fence.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const page = [
  ElectricFenceComponent,
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
import { OrganizationTreeSelectModule } from './../../../../share/organization-tree-select/organization-tree-select.module';
const mitModule = [
  MitLoadingModule,
  MitBaiduMapModule,
  MitAlertModule,
  MitDataTableModule,
  MitModalModule,
  OrganizationTreeSelectModule
];

// 路由
import { ElectricFenceRoutes } from './electric-fence.routes';

// 服务
import { ElectricFenceService } from './electric-fence.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...mitModule,
    ElectricFenceRoutes,
    NgbDatepickerModule
  ],
  declarations: [
    ...page
  ],
  providers: [ElectricFenceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ElectricFenceModule { }
