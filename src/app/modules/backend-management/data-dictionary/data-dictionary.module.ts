import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 页面
import { DataDictionaryComponent } from './data-dictionary.component';

// 路由
import { DataDictionaryRoutes } from './data-dictionary.routes';

@NgModule({
  imports: [
    CommonModule,
    DataDictionaryRoutes
  ],
  declarations: [DataDictionaryComponent]
})
export class DataDictionaryModule { }
