
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




// 路由注入
import { SpeedFenceRoutes } from './speed-fence.routes';


// 页面
import { SpeedFenceComponent } from './speed-fence.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { DetectCarComponent } from './detect-car/detect-car.component';
const page = [
  SpeedFenceComponent,
  DetailComponent,
  ModifyComponent,
  ListComponent,
  DeleteComponent,
  DetectCarComponent
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
import { SpeedFenceService } from './speed-fence.service';


@NgModule({
  imports: [
    CommonModule,
    SpeedFenceRoutes,
    FormsModule,
    ReactiveFormsModule,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [SpeedFenceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpeedFenceModule { }
