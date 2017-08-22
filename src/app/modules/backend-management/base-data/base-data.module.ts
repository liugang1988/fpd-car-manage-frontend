import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



// 页面
import { BaseDataComponent } from './base-data.component';

// 路由注入
import { BaseDataRoutes } from './base-data.routes';

// 权限控制模块
import { RbacModule } from '../../../rbac/rbac.module';



@NgModule( {
  declarations: [
    BaseDataComponent,
  ],
  imports: [
    BaseDataRoutes,
    RbacModule,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BaseDataModule { };
