import { ModuleWithProviders } from '@angular/core'; // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由

// 页面
import { SpeedFenceComponent } from './speed-fence.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';


const routes: Routes = [
  {
    path: '',
    component: SpeedFenceComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '速度栅栏'
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
          title: '车辆管理'
        }
      }
    ]
  }
];


export const SpeedFenceRoutes: ModuleWithProviders = RouterModule.forChild(routes);
