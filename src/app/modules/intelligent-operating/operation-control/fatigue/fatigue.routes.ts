import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// 页面
import { FatigueComponent } from './fatigue.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: FatigueComponent,
    data: {
      title: '疲劳驾驶'
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
        path: 'detail/:id',
        component: DetailComponent,
      }
    ]
  }

];
export const FatigueRoutes: ModuleWithProviders = RouterModule.forChild(routes);
