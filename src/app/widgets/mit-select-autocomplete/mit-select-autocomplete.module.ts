// auth: by Junchao Zheng
// date:  2016.12.17


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MitSelectAutocompleteComponent } from './mit-select-autocomplete.component';
import { MitSelectAutocompletePipe } from './mit-select-autocomplete.pipe';


@NgModule( {
  declarations: [
    MitSelectAutocompleteComponent,
    MitSelectAutocompletePipe
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [ MitSelectAutocompleteComponent, MitSelectAutocompletePipe ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MitSelectAutocompleteModule { }
