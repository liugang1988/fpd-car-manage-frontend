import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 服务
import { VehicleOffLineService } from './vehicle-off-line.service';

// 公用组件
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitModalModule } from '../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
import { SelectModule } from './../../../share/select/select.module';
import { MitPipeModule } from './../../../widgets/mit-pipe/mit-pipe.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  MitModalModule,
  OrganizationTreeSelectModule,
  SelectModule,
  MitPipeModule
];

// 页面
import { VehicleOffLineComponent } from './vehicle-off-line.component';
import { ListComponent } from './list/list.component';
const page = [
  VehicleOffLineComponent,
  ListComponent
];

// 路由
import { VehicleOffLineRoutes } from './vehicle-off-line.routes';

@NgModule({
  imports: [
    CommonModule,
    VehicleOffLineRoutes,
    FormsModule,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [VehicleOffLineService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleOffLineModule { }
