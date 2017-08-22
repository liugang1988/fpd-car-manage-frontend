import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';





// 路由注入
import { ProductManageRoutes } from './product-manage.routes';


// 页面
import { ProductManageComponent } from './product-manage.component';

// 服务
import { ProductManageService } from './product-manage.service';

@NgModule( {
  imports: [
    ProductManageRoutes,
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProductManageComponent
  ],
  providers: [ ProductManageService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductManageModule { }
