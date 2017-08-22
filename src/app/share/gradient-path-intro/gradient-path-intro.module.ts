import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradientPathIntroComponent } from './gradient-path-intro.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GradientPathIntroComponent],
  exports: [GradientPathIntroComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GradientPathIntroModule { }