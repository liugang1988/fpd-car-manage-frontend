import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { WorkConditionComponent } from './work-condition.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: WorkConditionComponent,
    data: {
      title: '车品牌'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'add',
        component: ModifyComponent,

      },
      {
        path: 'edit/:id',
        component: ModifyComponent,

      },
      {
        path: 'detail',
        component: ModifyComponent,
      }
    ]
  }
];

export const WorkConditionRoutes: ModuleWithProviders = RouterModule.forChild( routes );


