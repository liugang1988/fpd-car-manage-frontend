import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';



// 路由
import { PuchaseOrderRoutes } from './puchase-order.routes';


// 服务
import { PuchaseOrderService } from './puchase-order.service';

// 页面
import { PuchaseOrderComponent } from './puchase-order.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { DeleteComponent } from './delete/delete.component';
const page = [
  PuchaseOrderComponent,
  ListComponent,
  DetailComponent,
  ModifyComponent,
  DeleteComponent
];


// 公用组件
import { MitPipeModule } from '../../../../widgets/mit-pipe/mit-pipe.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
import { SupplierSelectModule } from '../../../../share/supplier-select/supplier-select.module';
import { ProductNumberSelectModule } from '../../../../share/product-number-select/product-number-select.module';
import { MitModalModule } from '../../../../widgets/mit-modal/mit-modal.module';
const mitModule = [
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  SupplierSelectModule,
  ProductNumberSelectModule,
  MitPipeModule,
  MitModalModule
];


@NgModule({
  imports: [
    CommonModule,
    PuchaseOrderRoutes,
    RouterModule,
    mitModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule
  ],
  declarations: [
    ...page
  ],
  providers: [PuchaseOrderService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PuchaseOrderModule { }
