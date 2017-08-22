import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataDictionaryComponent } from './data-dictionary.component';


const routes: Routes = [
  {
    path: '',
    component: DataDictionaryComponent,
    data: {
      title: '数据字典'
    }
    ,
    children: [
      {
        path: '',
        redirectTo: 'vehicle-series-manage'
      },
      {
        path: 'vehicle-series-manage',
        loadChildren: 'app/modules/backend-management/data-dictionary/vehicle-series-manage/vehicle-series-manage.module#VehicleSeriesManageModule' // 车辆系列管理
      },
      {
        path: 'vehicle-style-manage',
        loadChildren: 'app/modules/backend-management/data-dictionary/vehicle-style-manage/vehicle-style-manage.module#VehicleStyleManageModule' // 车辆年款管理
      }
    ]
  }
];

export const DataDictionaryRoutes: ModuleWithProviders = RouterModule.forChild(routes);


