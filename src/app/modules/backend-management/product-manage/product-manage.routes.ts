import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductManageComponent } from './product-manage.component';

// 设备库
import { DeviceLibraryComponent } from './device-library/device-library.component';




const routes: Routes = [
  {
    path: '',
    component: ProductManageComponent,
    data: {
      title: '产品管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'device-library'
      },
      {
        path: 'device-library',
        loadChildren: 'app/modules/backend-management/product-manage/device-library/device-library.module#DeviceLibraryModule' // 设备库
      },
      {
        path: 'device-out',
        loadChildren: 'app/modules/backend-management/product-manage/device-out/device-out.module#DeviceOutModule' // 设备出库
      },
      {
        path: 'device-in',
        loadChildren: 'app/modules/backend-management/product-manage/device-in/device-in.module#DeviceInModule' // 设备入库
      },
      {
        path: 'product-test',
        loadChildren: 'app/modules/backend-management/product-manage/product-test/product-test.module#ProductTestModule' // 生产测试
      },
      {
        path: 'puchase-order',
        loadChildren: 'app/modules/backend-management/product-manage/puchase-order/puchase-order.module#PuchaseOrderModule' // 采购订单
      },
      {
        path: 'sales-order',
        loadChildren: 'app/modules/backend-management/product-manage/sales-order/sales-order.module#SalesOrderModule' // 销售订单
      },
      
      {
        path: 'sim-manage',
        loadChildren: 'app/modules/backend-management/product-manage/sim-manage/sim-manage.module#SimManageModule' // SIM卡管理
      },
      {
        path: 'return-manage',
        loadChildren: 'app/modules/backend-management/product-manage/return-manage/return-manage.module#ReturnManageModule' // 退货管理
      }
    ]
  }
];

export const ProductManageRoutes: ModuleWithProviders = RouterModule.forChild( routes );


