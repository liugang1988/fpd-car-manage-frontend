import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { InsuranceQuoteComponent } from './insurance-quote.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [
  {
    path: '',
    component: InsuranceQuoteComponent,
    data: {
      title: '保险报价算法'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      }
    ]
  }
];

export const InsuranceQuoteRoutes: ModuleWithProviders = RouterModule.forChild( routes );


