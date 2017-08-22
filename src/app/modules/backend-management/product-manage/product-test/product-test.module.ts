import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由注入
import { ProductTestRoutes } from './product-test.routes';

// 页面
import { ProductTestComponent } from './product-test.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
const page = [
  ProductTestComponent,
  ListComponent,
  DetailComponent
];


// 公用组件
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SoftwareVersionSelectModule } from '../../../../share/software-version-select/software-version-select.module';
import { SelectModule } from './../../../../share/select/select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SoftwareVersionSelectModule,
  SelectModule,
  MitModalModule
];

// 服务
import { ProductTestService } from './product-test.service';

@NgModule( {
  imports: [
    CommonModule,
    ProductTestRoutes,
    RouterModule,
    mitModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ ProductTestService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductTestModule { }
