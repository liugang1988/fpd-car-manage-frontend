import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { ProductTestComponent } from './product-test.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: ProductTestComponent,
    data: {
      title: '生产测试'
    },
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '详情'
        }
      }

    ]
  }
];

export const ProductTestRoutes: ModuleWithProviders = RouterModule.forChild( routes );


