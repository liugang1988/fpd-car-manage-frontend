import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// 菜单管理
import { MenuManageComponent } from './menu-manage.component';
import { TreeComponent } from './tree/tree.component';

const routes: Routes = [
  {
      path: '',
      component: MenuManageComponent,
      data: {
        title: '菜单管理'
      },
      children: [
        {
          path: '',
          component: TreeComponent
        }
      ]
  }
];

export const MenuManageRoutes: ModuleWithProviders = RouterModule.forChild(routes);


