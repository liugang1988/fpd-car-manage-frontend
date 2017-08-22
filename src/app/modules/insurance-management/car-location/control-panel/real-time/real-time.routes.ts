import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../../../rbac/rbac.service';

import { RealTimeComponent } from './real-time.component';

// 二级页面组件


const routes: Routes = [
  {
    path: '',
    component: RealTimeComponent,
    canActivate: [RbacService],
    children: [


    ]
  }
];

export const RealTimeRoutes: ModuleWithProviders = RouterModule.forChild(routes);




