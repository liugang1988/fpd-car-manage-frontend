import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 页面
import { WorkConditionComponent } from './work-condition.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const page = [
  WorkConditionComponent,
  ModifyComponent,
  ListComponent,
  DetailComponent
];

// 路由注入
import { WorkConditionRoutes } from './work-condition.routes';



// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule
];

// 服务
import { WorkConditionService } from './work-condition.service';

@NgModule({
  imports: [
    CommonModule,
    WorkConditionRoutes,
    ReactiveFormsModule,
    FormsModule,
    ...mitModule,
  ],
  declarations: [
    ...page
  ],
  providers: [WorkConditionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkConditionModule { }
