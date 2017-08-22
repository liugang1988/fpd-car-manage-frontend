import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { SearchAreaComponent } from './search-area.component';
@NgModule( {
  imports: [
    FormsModule,
    NgbDatepickerModule,
    CommonModule
  ],
  declarations: [ SearchAreaComponent ],
  exports: [ SearchAreaComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SearchAreaModule { }
