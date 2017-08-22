import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

// 路由注入
import { VehicleInformationRoutes } from './vehicle-information.routes';


// 服务
import { VehicleInformationService } from './vehicle-information.service';


// 页面
import { VehicleInformationComponent } from './vehicle-information.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
const page = [
  VehicleInformationComponent,
  DetailComponent,
  ModifyComponent,
  ListComponent,
  DeleteComponent
];


// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';
import { ImportComponent } from './import/import.component';

// 公用组件
import { MitPipeModule } from '../../../widgets/mit-pipe/mit-pipe.module';
import { MitUploadModule } from './../../../widgets/mit-upload/mit-upload.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitDataTableModule } from '../../../widgets/mit-data-table/mit-data-table.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { DepartmentSelectModule } from '../../../share/department-select/department-select.module';
import { VehicleSelectModule } from '../../../share/vehicle-select/vehicle-select.module';
import { FileUploadModule } from '../../../share/file-upload/file-upload.module';
import { DictionarySelectModule } from '../../../share/dictionary-select/dictionary-select.module';
import { MitLightboxModule } from '../../../widgets/mit-lightbox/mit-lightbox.module';
import { MitModalModule } from './../../../widgets/mit-modal/mit-modal.module';
import { OrganizationTreeSelectModule } from './../../../share/organization-tree-select/organization-tree-select.module';
const module = [
  MitPipeModule,
  MitDataTableModule,
  MitAlertModule,
  MitLoadingModule,
  MitUploadModule,
  DepartmentSelectModule,
  VehicleSelectModule,
  FileUploadModule,
  DictionarySelectModule,
  MitLightboxModule,
  MitModalModule,
  OrganizationTreeSelectModule
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    VehicleInformationRoutes,
    RbacModule,
    NgbDatepickerModule,
    ...module
  ],
  declarations: [
    ...page,
    ImportComponent
  ],
  providers: [VehicleInformationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleInformationModule { }
