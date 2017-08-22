import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 页面
import { InsuranceCompanyComponent } from './insurance-company.component';
import { ListComponent } from './list/list.component';

const page = [
  InsuranceCompanyComponent,
  ListComponent
];

// 路由注入
import { InsuranceCompanyRoutes } from './insurance-company.routes';

// 服务
import { InsuranceCompanyService } from './insurance-company.service';
import { ModifyComponent } from './modify/modify.component';



@NgModule({
  imports: [
    CommonModule,
    InsuranceCompanyRoutes,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ...page,
    ModifyComponent
  ],
  providers: [InsuranceCompanyService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsuranceCompanyModule { }
