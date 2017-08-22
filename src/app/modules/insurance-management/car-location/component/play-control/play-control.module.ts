import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayControlComponent } from './play-control.component';
@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [ PlayControlComponent ],
  exports: [ PlayControlComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PlayControlModule { }
