import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


// 路由注入
import { LogManageRoutes } from './log-manage.routes';


// 页面
import { LogManageComponent } from './log-manage.component';

const page = [
  LogManageComponent
];


// 组件
import { MitTabsModule } from '../../../widgets/mit-tabs/mit-tabs.module';
const mitModule = [
  MitTabsModule
];


@NgModule( {
  imports: [
    CommonModule,
    LogManageRoutes,
    ...mitModule
  ],
  declarations: [
    ...page
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LogManageModule { }
