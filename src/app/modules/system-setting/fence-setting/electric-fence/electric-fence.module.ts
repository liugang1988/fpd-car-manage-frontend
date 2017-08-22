import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ElectricFenceRoutes } from './electric-fence.routes';

// 页面
import { ElectricFenceComponent } from './electric-fence.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteComponent } from './delete/delete.component';
import { DetectCarComponent } from './detect-car/detect-car.component';
const page = [
  ElectricFenceComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent,
  DetectCarComponent,
  DeleteComponent
];

// 公用模块
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitBaiduMapModule } from '../../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { DepartmentSelectModule } from '../../../../share/department-select/department-select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitLoadingModule,
  MitBaiduMapModule,
  MitAlertModule,
  MitDataTableModule,
  DepartmentSelectModule,
  MitModalModule
];


// 服务
import { ElectricFenceService } from './electric-fence.service';

@NgModule({
  imports: [
    CommonModule,
    ElectricFenceRoutes,
    FormsModule,
    ReactiveFormsModule,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [ElectricFenceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ElectricFenceModule { }
