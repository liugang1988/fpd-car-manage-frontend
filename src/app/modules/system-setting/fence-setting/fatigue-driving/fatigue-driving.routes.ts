import { ModuleWithProviders } from '@angular/core'; // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由

// 页面
import { FatigueDrivingComponent } from './fatigue-driving.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '',
    component: FatigueDrivingComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '疲劳驾驶'
        }
      }
    ]
  }
];


export const FatigueDrivingRoutes: ModuleWithProviders = RouterModule.forChild(routes);
