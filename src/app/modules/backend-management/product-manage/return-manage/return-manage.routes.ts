import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { ReturnManageComponent } from './return-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';




const routes: Routes = [
  {
    path: '',
    component: ReturnManageComponent,
    data: {
      title: '退货管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'add/:id',
        component: ModifyComponent
      },
      {
        path: 'edit/:id',
        component: ModifyComponent
      }
      ,
      {
        path: 'detail/:id',
        component: DetailComponent
      }
    ]
  }
];

export const ReturnManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


