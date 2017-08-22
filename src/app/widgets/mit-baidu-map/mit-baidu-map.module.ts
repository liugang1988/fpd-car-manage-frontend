// auth: by Junchao Zheng
// date:  2017.2.17


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonpModule } from '@angular/http';

import {MitBaiduMapComponent} from './mit-baidu-map.component';


// 服务
import { MitBaiduMapLoaderService } from './services/mit-baidu-map.loader.service';
import { MitBaiduMapService } from './services/mit-baidu-map.service';

@NgModule({
  imports: [
    JsonpModule,
    FormsModule,
    NgbModule,
    CommonModule
  ],
  declarations: [MitBaiduMapComponent],
  exports: [ MitBaiduMapComponent, ],
  providers: [ MitBaiduMapLoaderService, MitBaiduMapService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MitBaiduMapModule { }
