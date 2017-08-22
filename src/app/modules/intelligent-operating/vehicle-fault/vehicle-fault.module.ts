import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleFaultRoutes } from './vehicle-fault.routes';

// 服务
import { VehicleFaultService } from './vehicle-fault.service';


// 组件
import { VehicleFaultComponent } from './vehicle-fault.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CleanComponent } from './clean/clean.component';

// 公共模块
import { MitPipeModule } from '../../../widgets/mit-pipe/mit-pipe.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from './../../../share/department-select/department-select.module';
import { MitModalModule } from './../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
import { SelectModule } from './../../../share/select/select.module';
const mitModule = [
  MitPipeModule,
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  DepartmentSelectModule,
  MitModalModule,
  OrganizationTreeSelectModule,
  SelectModule
];

@NgModule({
  imports: [
    ...mitModule,
    FormsModule,
    RouterModule,
    CommonModule,
    VehicleFaultRoutes
  ],
  declarations: [VehicleFaultComponent, ListComponent, DetailComponent, CleanComponent],
  providers: [VehicleFaultService]
})
export class VehicleFaultModule { }
