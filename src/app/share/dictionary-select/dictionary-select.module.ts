import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictionarySelectComponent } from './dictionary-select.component';
import { DictionarySelectPipe } from './dictionary-select.pipe';
import { DictionarySelectService } from './dictionary-select.service';
@NgModule( {
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  declarations: [ DictionarySelectComponent, DictionarySelectPipe ],
  exports: [ DictionarySelectComponent ],
  providers: [DictionarySelectService]
})
export class DictionarySelectModule { }
