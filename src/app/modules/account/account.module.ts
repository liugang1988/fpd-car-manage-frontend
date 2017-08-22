import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// 路由注入
import { AccountRoutes } from './account.routes';

// 表单引入
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// 依赖组件
import { MitLoadingModule } from '../../widgets/mit-loading/mit-loading.module';
import { MitAddressSelectModule } from '../../widgets/mit-address-select/mit-address-select.module';

const mitModule = [
  MitLoadingModule,
  MitAddressSelectModule
];


//  页面
import { AccountComponent } from './account.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPwComponent } from './pages/reset-pw/reset-pw.component';
import { CollectComponent } from './pages/collect/collect.component';
const accountPage = [
  AccountComponent,
  LoginComponent,
  RegisterComponent,
  ResetPwComponent,
  CollectComponent
];

// 权限控制模块
import { RbacModule } from '../../rbac/rbac.module';


// 服务
import { AccountService } from './services/account.service';

@NgModule( {
  declarations: [
    ...accountPage
  ],
  imports: [
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AccountRoutes,
    RbacModule
  ],
  providers: [ AccountService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AccountModule { };
