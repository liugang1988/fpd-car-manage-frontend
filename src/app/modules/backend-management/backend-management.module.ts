import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


// 路由注入
import { BackendManagementRoutes } from './backend-management.routes';




//  页面
import { BackendManagementComponent } from './backend-management.component';



// 权限控制模块
import { RbacModule } from '../../rbac/rbac.module';




@NgModule( {
  declarations: [
    BackendManagementComponent
  ],
  imports: [
    BackendManagementRoutes,
    RbacModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BackendManagementModule { };
