import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




// 页面
import { ParamSettingComponent } from './param-setting.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: ParamSettingComponent,
    data: {
      title: '设备参数'
    },
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '参数设置'
        }

      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '设置记录'
        }
      }
    ]
  }
];

export const ParamSettingRoutes: ModuleWithProviders = RouterModule.forChild(routes);


