import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { UpgradeManageComponent } from './upgrade-manage.component';
import { ListComponent } from './list/list.component';
import { RecordComponent } from './record/record.component';


const routes: Routes = [
  {
    path: '',
    component: UpgradeManageComponent,
    data: {
      title: '升级管理'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      }
    ]
  }
];

export const UpgradeManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


