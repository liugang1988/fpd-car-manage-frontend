// auth: by QunHe Lin
// date:  2017.1.17


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 管道
import { ProductNumberSelectPipe } from './product-number-select.pipe';


// 页面
import { ProductNumberSelectComponent } from './product-number-select.component';


// 服务
import { ProductNumberSelectService } from './product-number-select.service';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProductNumberSelectComponent
  ],
  providers: [ ProductNumberSelectService ],
  declarations: [ ProductNumberSelectComponent, ProductNumberSelectPipe ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductNumberSelectModule { }
