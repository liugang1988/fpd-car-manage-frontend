import { ModuleWithProviders } from '@angular/core'; // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由

// 页面
import { IdlingFenceComponent } from './idling-fence.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [
  {
    path: '',
    component: IdlingFenceComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '怠速栅栏'
        }
      }
    ]
  }
];


export const IdlingFenceRoutes: ModuleWithProviders = RouterModule.forChild(routes);
