// auth: by QunHe Lin
// date:  2017.1.12


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 页面
import { SupplierSelectComponent } from './supplier-select.component';


// 管道
import { SupplierSelectPipe } from './supplier-select.pipe';


// 服务
import { SupplierSelectService } from './supplier-select.service';


@NgModule( {
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SupplierSelectComponent
  ],
  declarations: [
    SupplierSelectComponent
    , SupplierSelectPipe
  ],
  providers: [ SupplierSelectService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SupplierSelectModule { }
