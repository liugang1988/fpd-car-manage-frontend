import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OnlyYearMonthSelectComponent } from './only-year-month-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [OnlyYearMonthSelectComponent],
  exports: [OnlyYearMonthSelectComponent]
})
export class OnlyYearMonthSelectModule { }
