import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 页面
import { UbiModelComponent } from './ubi-model.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteComponent } from './delete/delete.component';
import { StepOneComponent } from './modify/step-one/step-one.component';
import { StepTwoComponent } from './modify/step-two/step-two.component';
import { StepThreeComponent } from './modify/step-three/step-three.component';
const page = [
  UbiModelComponent,
  ListComponent,
  DetailComponent,
  DeleteComponent,
  ModifyComponent,
  StepOneComponent,
  StepTwoComponent,
  StepThreeComponent
];

// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
const mitModule = [
  MitDataTableModule,
  MitLoadingModule,
  MitAlertModule
];


// 路由注入
import { UbiModelRoutes } from './ubi-model.routes';

// 服务
import { UbiModelService } from './ubi-model.service';


@NgModule({
  imports: [
    CommonModule,
    UbiModelRoutes,
    ReactiveFormsModule,
    FormsModule,
    mitModule
  ],
  declarations: [
    ...page
  ],
  providers: [UbiModelService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UbiModelModule { }
