import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 页面
import { VehicleStyleManageComponent } from './vehicle-style-manage.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
const page = [
  VehicleStyleManageComponent,
  ListComponent,
  AddComponent
]

// 服务
import { VehicleStyleManageService } from './vehicle-style-manage.service';

// 路由
import { VehicleStyleManageRoutes } from './vehicle-style-manage.routes';

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
import { SelectModule } from './../../../../share/select/select.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  MitModalModule,
  SelectModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    VehicleStyleManageRoutes,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [VehicleStyleManageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleStyleManageModule { }
