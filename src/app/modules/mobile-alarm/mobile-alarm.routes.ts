import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; ;



// 页面
import { MobileAlarmComponent } from './mobile-alarm.component';


const routes: Routes = [
  {
    path: '',
    component: MobileAlarmComponent,
    data: {
      title: '事件处理'
    }
  }
];

export const MobileAlarmRoutes: ModuleWithProviders = RouterModule.forChild(routes);
