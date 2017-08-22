import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../../../rbac/rbac.service';

import { HistoryTrackComponent } from './history-track.component';

// 二级页面组件


const routes: Routes = [
  {
    path: '',
    component: HistoryTrackComponent,
    canActivate: [RbacService],
    children: []
  }
];

export const HistoryTrackRoutes: ModuleWithProviders = RouterModule.forChild(routes);




