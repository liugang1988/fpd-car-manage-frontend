import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitLightboxComponent } from './mit-lightbox.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MitLightboxComponent],
  exports: [MitLightboxComponent]
})
export class MitLightboxModule { }
