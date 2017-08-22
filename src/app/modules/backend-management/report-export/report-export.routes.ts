import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportExportComponent } from './report-export.component';


const routes: Routes = [
  {
    path: '',
    component: ReportExportComponent,
    data: {
      title: '400报表导出'
    }
  }
];

export const ReportExportRoutes: ModuleWithProviders = RouterModule.forChild( routes );


