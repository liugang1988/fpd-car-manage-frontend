import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RoleSelectComponent } from './role-select.component';
import { RoleSelectService } from './role-select.service';
@NgModule( {
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [ RoleSelectComponent ],
  exports: [ RoleSelectComponent ],
  providers: [ RoleSelectService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RoleSelectModule { }
