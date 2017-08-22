import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// 服务
import { MitImageUploadLoaderService } from './services/mit-image-upload.loader.service'; // 异步加载JS
import { MitImageUploadService } from './services/mit-image-upload.service';
const service = [
  MitImageUploadLoaderService,
  MitImageUploadService
];

// 页面
import { MitUploadComponent } from './mit-upload.component';


// 组件
import { MitLoadingModule } from '../mit-loading/mit-loading.module';

const component = [
  MitUploadComponent
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MitLoadingModule
  ],
  declarations: [
    ...component
  ],
  exports: [
    ...component
  ],
  providers: [
    ...service
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MitUploadModule { }
