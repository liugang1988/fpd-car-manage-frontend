import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapEventFilterComponent } from './map-event-filter.component';
import { GetNamePipe } from './map-event-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MapEventFilterComponent,GetNamePipe],
  exports: [MapEventFilterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapEventFilterModule { }
