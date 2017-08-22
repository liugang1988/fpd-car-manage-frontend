import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { InsuranceProjectComponent } from './insurance-project.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [
  {
    path: '',
    component: InsuranceProjectComponent,
    data: {
      title: '保险项目'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      }
    ]
  }
];

export const InsuranceProjectRoutes: ModuleWithProviders = RouterModule.forChild( routes );


