import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MitBreadcrumbModule } from '../mit-breadcrumb/mit-breadcrumb.module';
import { MitUserBoxModule } from '../mit-user-box/mit-user-box.module';
import { MitTaskBoxModule } from '../mit-task-box/mit-task-box.module';


// component
import { MitLayoutComponent } from './mit-layout.component';
import { MitHeaderComponent } from './mit-header/mit-header.component';
import { MitFooterComponent } from './mit-footer/mit-footer.component';
import { MitSidebarComponent } from './mit-sidebar/mit-sidebar.component';

const component = [
  MitLayoutComponent,
  MitHeaderComponent,
  MitFooterComponent,
  MitSidebarComponent
];


@NgModule({
  imports: [
    MitUserBoxModule,
    MitTaskBoxModule,
    MitBreadcrumbModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    ...component
  ],
  exports: [
    ...component
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MitLayoutModule { }
