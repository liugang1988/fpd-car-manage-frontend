import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RbacService } from '../../../rbac/rbac.service';




// 二级页面组件
import { OperationalDataComponent } from './operational-data.component';
import { ListComponent } from './list/list.component';




const routes: Routes = [
  {
    path: '',
    component: OperationalDataComponent,
    canActivate: [RbacService],
    children: [
      {
        path: '',
        component: ListComponent,  
        data: {
          title: '运营数据统计'
        }
      }
    ]
  }
];

export const OperationalDataRoutes: ModuleWithProviders = RouterModule.forChild(routes);
