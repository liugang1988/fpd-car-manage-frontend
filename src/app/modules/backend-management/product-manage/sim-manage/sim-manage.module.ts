import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由注入
import { SimManageRoutes } from './sim-manage.routes';


// 服务
import { SimManageService } from './sim-manage.service';

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  MitModalModule
];

// 页面
import { SimManageComponent } from './sim-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  SimManageComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent,
];

@NgModule( {
  imports: [
    CommonModule,
    SimManageRoutes,
    FormsModule,
    ReactiveFormsModule,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [ SimManageService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SimManageModule { }
