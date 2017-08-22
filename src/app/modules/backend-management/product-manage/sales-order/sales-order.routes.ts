import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { SalesOrderComponent } from './sales-order.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: SalesOrderComponent,
    data: {
      title: '销售订单'
    },
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增销售订单'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '编辑销售订单'
        }
      }
      ,
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '销售订单详情'
        }
      }
    ]
  }
];

export const SalesOrderRoutes: ModuleWithProviders = RouterModule.forChild( routes );


