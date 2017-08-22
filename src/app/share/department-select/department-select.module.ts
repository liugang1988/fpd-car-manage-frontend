import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DepartmentSelectService } from './department-select.service';
import { DepartmentSelectComponent } from './department-select.component';
import { DepartmentSelectPipe } from './department-select.pipe';

@NgModule( {
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [ DepartmentSelectComponent, DepartmentSelectPipe ],
  exports: [ DepartmentSelectComponent ],
  providers: [ DepartmentSelectService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DepartmentSelectModule { }
