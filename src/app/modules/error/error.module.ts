import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


// 路由
import { ErrorRoutes } from './error.routes';


//  页面
import { ErrorComponent } from './error.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { Error403Component } from './pages/error-403/error-403.component';
import { Error500Component } from './pages/error-500/error-500.component';
const page = [
  ErrorComponent,
  Error404Component,
  Error403Component,
  Error500Component
];


@NgModule( {
  declarations: [
    ...page
  ],
  imports: [
    ErrorRoutes
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ErrorModule { };
