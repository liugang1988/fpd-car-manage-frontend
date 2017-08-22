import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizationSelectComponent } from './organization-select.component';
import { OrganizationSelectService } from './organization-select.service';
import { OrganizationSelectPipe } from './organization-select.pipe';
@NgModule( {
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ OrganizationSelectComponent, OrganizationSelectPipe ],
  exports: [ OrganizationSelectComponent ],
  providers: [ OrganizationSelectService ]
})
export class OrganizationSelectModule { }
