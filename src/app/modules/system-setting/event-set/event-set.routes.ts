import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// 页面
import { EventSetComponent } from './event-set.component';

// 服务
import { RbacService } from '../../../rbac/rbac.service';

const routes: Routes = [
  {
    path: '',
    component: EventSetComponent,
    data: {
      title: '事件设置'
    }
  }
];

export const EventSetRoutes: ModuleWithProviders = RouterModule.forChild(routes);


