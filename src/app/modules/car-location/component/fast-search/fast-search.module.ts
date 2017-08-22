import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FastSearchPipe } from './fast-search.pipe';

// 公用组件
import { MitAlertModule } from '../../../../widgets/mit-alert/mit-alert.module';
import { MitPipeModule } from '../../../../widgets/mit-pipe/mit-pipe.module';

// 页面
import { FastSearchComponent } from './fast-search.component';



@NgModule( {
  imports: [
    MitAlertModule,
    FormsModule,
    CommonModule,
    MitPipeModule
  ],
  declarations: [
    FastSearchPipe,
    FastSearchComponent
  ],
  exports: [
    FastSearchPipe,
    FastSearchComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FastSearchModule { }
