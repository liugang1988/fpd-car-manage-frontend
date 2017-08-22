import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleSelectComponent } from './vehicle-select.component';
import { VehicleSelectPipe } from './vehicle-select.pipe';
import { VehicleSelectService } from './vehicle-select.service';


@NgModule( {
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ VehicleSelectComponent, VehicleSelectPipe ],
  providers: [ VehicleSelectService ],
  exports: [ VehicleSelectComponent ]
})
export class VehicleSelectModule { }
