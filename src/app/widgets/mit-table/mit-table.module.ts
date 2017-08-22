// auth: by Junchao Zheng
// date:  2016.12.17


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MitTableComponent } from './mit-table.component';
import { PagingPipe } from './mit-table-pipe/paging.pipe';
import { SortingPipe } from './mit-table-pipe/sorting.pipe';
import { MitTablePaginationComponent } from './mit-table-pagination/mit-table-pagination.component';


@NgModule( {
  declarations: [
    MitTableComponent,
    PagingPipe,
    SortingPipe,
    MitTablePaginationComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule
  ],
  exports: [ MitTableComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MitTableModule { }
