import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PeopleCarBindingComponent } from './people-car-binding.component';


// 二级页面组件
import { ListComponent } from './list/list.component'; // 表格数据

// 服务
import { RbacService } from '../../../rbac/rbac.service';



const routes: Routes = [
  {
    path: '',
    component: PeopleCarBindingComponent,
    data: {
      title: '人车绑定'
    },
    canActivate: [ RbacService ],
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: '人车绑定'
        }
      }
    ]
  }
];

export const PeopleCarBindingRoutes: ModuleWithProviders = RouterModule.forChild( routes );
