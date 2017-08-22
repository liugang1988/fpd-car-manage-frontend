import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// 页面
import { EventSelectComponent } from './event-select.component';

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [ EventSelectComponent ]
})
export class EventSelectModule { }
