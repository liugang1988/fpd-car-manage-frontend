
import { ModuleWithProviders } from '@angular/core'; // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由

// 页面
import { ElectricFenceComponent } from './electric-fence.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';


const routes: Routes = [
  {
    path: '',
    component: ElectricFenceComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '电子围栏'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增围栏'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '围栏修改'
        }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '围栏信息'
        }
      }
    ]
  }
];


export const FatigueDrivingRoutes: ModuleWithProviders = RouterModule.forChild(routes);


export const ElectricFenceRoutes: ModuleWithProviders = RouterModule.forChild(routes);
