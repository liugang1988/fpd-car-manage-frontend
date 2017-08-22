import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 页面
import { InsuranceQuoteComponent } from './insurance-quote.component';
import { ListComponent } from './list/list.component';

const page = [
  InsuranceQuoteComponent,
  ListComponent
];

// 路由注入
import { InsuranceQuoteRoutes } from './insurance-quote.routes';

// 服务
import { InsuranceQuoteService } from './insurance-quote.service';



@NgModule({
  imports: [
    CommonModule,
    InsuranceQuoteRoutes,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ...page
  ],
  providers: [InsuranceQuoteService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsuranceQuoteModule { }
