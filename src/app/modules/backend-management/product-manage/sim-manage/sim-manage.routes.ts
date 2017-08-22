import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { SimManageComponent } from './sim-manage.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  {
    path: '',
    component: SimManageComponent,
    data: {
      title: 'SIM卡管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'SIM卡管理'
        },
      },
      {
        path: 'add',
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

export const SimManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


