import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面组件
import { VehicleManagementComponent } from './vehicle-management.component';






const routes: Routes = [
  {
    path: '',
    component: VehicleManagementComponent,
    children: [

    ]
  }
];

export const VehicleManagementRoutes: ModuleWithProviders = RouterModule.forChild( routes );


