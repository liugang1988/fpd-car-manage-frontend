import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// 二级页面组件
import { VehicleInformationComponent } from './vehicle-information.component';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';


// 服务
import { RbacService } from '../../../rbac/rbac.service';




const routes: Routes = [
  {
    path: '',
    component: VehicleInformationComponent,
    data: {
      title: '车辆信息'
    },
    canActivate: [ RbacService ],
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: '车辆信息详情'
        }
      },
      {
        path: 'add',
        component: ModifyComponent,
        data: {
          title: '车辆信息添加'
        }
      },
      {
        path: 'edit/:id',
        component: ModifyComponent,
        data: {
          title: '车辆信息编辑'
        }
      }
    ]
  }
];

export const VehicleInformationRoutes: ModuleWithProviders = RouterModule.forChild( routes );
