import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancedSearchComponent } from './advanced-search.component';
@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [ AdvancedSearchComponent ],
  exports: [ AdvancedSearchComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdvancedSearchModule { }
