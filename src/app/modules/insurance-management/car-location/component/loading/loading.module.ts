import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitLoadingModule } from '../../../../../widgets/mit-loading/mit-loading.module';

import { LoadingComponent } from './loading.component';
@NgModule({
  imports: [
    MitLoadingModule,
    CommonModule
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class LoadingModule { }
