import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from './share.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShareComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule { }
