import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MitAddressSelectComponent } from './mit-address-select.component';
import { MitAddressSelectService } from './mit-address-select.service';
import { MitAddressSelectPipe } from './mit-address-select.pipe';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    MitAddressSelectComponent,
    MitAddressSelectPipe
  ],
  providers: [MitAddressSelectService],
  exports: [MitAddressSelectComponent]
})
export class MitAddressSelectModule { }
