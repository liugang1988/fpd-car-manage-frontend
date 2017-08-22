import { ModuleWithProviders } from '@angular/core'; // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由

// 页面
import { RegionFenceComponent } from './region-fence.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';


const routes: Routes = [
  {
    path: '',
    component: RegionFenceComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '区域栅栏'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增栅栏'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '修改栅栏'
        }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '区域栅栏'
        }
      }
    ]
  }
];


export const RegionFenceRoutes: ModuleWithProviders = RouterModule.forChild(routes);
