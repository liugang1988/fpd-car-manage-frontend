import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 页面

// 服务
import { UbiModelService } from '../ubi-model.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    
  ],
  providers: [UbiModelService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModifyModule { }
