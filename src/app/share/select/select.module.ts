import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { SelectPipe } from './select.pipe';
@NgModule( {
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ SelectComponent, SelectPipe ],
  exports: [ SelectComponent ],
  providers: []
})
export class SelectModule { }
