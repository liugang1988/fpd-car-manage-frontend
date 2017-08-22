import { ModuleWithProviders } from '@angular/core'; // 核心module
import { Routes, RouterModule } from '@angular/router'; // 路由

// 页面
import { NameOfCarComponent } from './name-of-car.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';


const routes: Routes = [
  {
    path: '',
    component: NameOfCarComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '汽车点名'
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
          title: '点名详情'
        }
      }
    ]
  }
];


export const NameOfCarRoutes: ModuleWithProviders = RouterModule.forChild(routes);
