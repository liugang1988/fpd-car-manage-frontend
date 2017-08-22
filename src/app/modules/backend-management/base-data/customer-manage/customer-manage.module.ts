import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManageRoutes } from './customer-manage.routes';
import { CustomerManageComponent } from './customer-manage.component';

// 权限控制模块
import { RbacModule } from '../../../../rbac/rbac.module';



@NgModule( {
  imports: [
    CommonModule,
    CustomerManageRoutes,
    RbacModule
  ],
  declarations: [
    CustomerManageComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerManageModule { }
