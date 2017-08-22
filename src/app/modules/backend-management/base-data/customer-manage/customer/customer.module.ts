import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CustomerRoutes } from './customer.routes';
import { CustomerService } from './customer.service';

// 页面
import { CustomerComponent } from './customer.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
const page = [
  CustomerComponent,
  ListComponent,
  ModifyComponent,
  DeleteComponent
];

// 公共组件
import { MitPipeModule } from '../../../../../widgets/mit-pipe/mit-pipe.module';
import { MitDataTableModule } from '../../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../../widgets/mit-loading/mit-loading.module';
import { MitModalModule } from '../../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitPipeModule,
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  MitModalModule
];


@NgModule( {
  imports: [
    CustomerRoutes,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ...mitModule,
  ],
  declarations: [
    ...page
  ],
  providers: [
    CustomerService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerModule { }
