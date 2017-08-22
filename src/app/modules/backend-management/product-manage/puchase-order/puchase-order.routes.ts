import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 采购订单
import { PuchaseOrderComponent } from './puchase-order.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';




const routes: Routes = [
  {
    path: '',
    component: PuchaseOrderComponent,
    data: {
      title: '采购订单'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '采购订单详情'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '新增采购订单'
        }
      },
      {
        path: 'edit/:id/:orderid',
        component: ModifyComponent,
        data: {
          title: '编辑采购订单'
        }
      }
    ]
  }
];

export const PuchaseOrderRoutes: ModuleWithProviders = RouterModule.forChild( routes );


