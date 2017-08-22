import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SoftwareVersionSelectComponent } from './software-version-select.component';
import { SoftwareVersionSelectService } from './software-version-select.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [SoftwareVersionSelectService],
  declarations: [SoftwareVersionSelectComponent],
  exports: [SoftwareVersionSelectComponent]
})
export class SoftwareVersionSelectModule { }
