import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


// 页面
import { PowerManageComponent } from './power-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const page = [
  PowerManageComponent,
  ListComponent,
  ModifyComponent,
  DetailComponent
];

// 路由注入
import { PowerManageRoutes } from './power-manage.routes';





// 公用组件
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule
];

// 服务
import { PowerManageService } from './power-manage.service';


@NgModule( {
  imports: [
    CommonModule,
    PowerManageRoutes,
    MitDataTableModule
  ],
  declarations: [
    ...page
  ],
  providers: [ PowerManageService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PowerManageModule { }
