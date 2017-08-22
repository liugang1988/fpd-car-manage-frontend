import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizationTreeSelectComponent } from './organization-tree-select.component';
import { OrganizationTreeSelectService } from './organization-tree-select.service';
// 第三方组件
import { TreeModule } from 'angular2-tree-component'; // 树组件

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule
  ],
  declarations: [OrganizationTreeSelectComponent],
  exports: [OrganizationTreeSelectComponent],
  providers: [OrganizationTreeSelectService]
})
export class OrganizationTreeSelectModule { }
