import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MitTimePickerComponent } from './mit-time-picker.component';
import { MitTimePickerPipe } from './mit-time-picker.pipe';


@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [MitTimePickerComponent, MitTimePickerPipe],
  exports: [MitTimePickerComponent]
})
export class MitTimePickerModule { }
