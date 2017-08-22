import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 路由注入
import { DriverManageRoutes } from './driver-manage.routes';


// 页面
import { DriverManageComponent } from './driver-manage.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { KpiDetailComponent } from './kpi-detail/kpi-detail.component';
import { ImportComponent } from './import/import.component';
import { AccessFileComponent } from './access-file/access-file.component';
const page = [
  ModifyComponent,
  DetailComponent,
  ListComponent,
  DriverManageComponent,
  DeleteComponent,
  KpiDetailComponent,
  ImportComponent,
  AccessFileComponent
];


// 服务
import { DriverManageService } from './driver-manage.service';


// 公用组件
import { MitPipeModule } from '../../../widgets/mit-pipe/mit-pipe.module';
import { MitAddressSelectModule } from '../../../widgets/mit-address-select/mit-address-select.module';
import { MitUploadModule } from './../../../widgets/mit-upload/mit-upload.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { FileUploadModule } from '../../../share/file-upload/file-upload.module';
import { MitLightboxModule } from '../../../widgets/mit-lightbox/mit-lightbox.module';
import { MitStarsModule } from './../../../widgets/mit-stars/mit-stars.module';
import { MitModalModule } from './../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
import { SelectModule } from './../../../share/select/select.module';
const mitModule = [
  MitPipeModule,
  MitAddressSelectModule,
  MitDataTableModule,
  DepartmentSelectModule,
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  MitUploadModule,
  FileUploadModule,
  MitLightboxModule,
  MitStarsModule,
  MitModalModule,
  OrganizationTreeSelectModule,
  SelectModule
];

// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';



@NgModule({
  imports: [
    ...mitModule,
    NgbDatepickerModule,
    CommonModule,
    DriverManageRoutes,
    RbacModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ...page
  ],
  providers: [DriverManageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DriverManageModule { }
