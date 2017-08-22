import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 页面
import { InsuranceProjectComponent } from './insurance-project.component';
import { ListComponent } from './list/list.component';

const page = [
  InsuranceProjectComponent,
  ListComponent
];

// 路由注入
import { InsuranceProjectRoutes } from './insurance-project.routes';

// 服务
import { InsuranceProjectService } from './insurance-project.service';



@NgModule({
  imports: [
    CommonModule,
    InsuranceProjectRoutes,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ...page
  ],
  providers: [InsuranceProjectService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsuranceProjectModule { }
