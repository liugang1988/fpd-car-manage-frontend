import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadService } from './file-upload.service';
import { MitLoadingModule } from '../../widgets/mit-loading/mit-loading.module';
@NgModule( {
  imports: [
    CommonModule,
    MitLoadingModule
  ],
  declarations: [ FileUploadComponent ],
  exports: [ FileUploadComponent ],
  providers: [ FileUploadService ]
})
export class FileUploadModule { }
