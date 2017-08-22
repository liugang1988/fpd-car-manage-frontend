import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 二级页面组件
import { ErrorComponent } from './error.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { Error403Component } from './pages/error-403/error-403.component';
import { Error500Component } from './pages/error-500/error-500.component';


const routes: Routes = [
    {

        path: '',
        component: ErrorComponent,
        children: [
            {
                path: '404',
                component: Error404Component,
                data: {
                    title: '找不到相关的页面'
                }
            },
            {
                path: '403',
                component: Error403Component,
                data: {
                    title: '权限不足'
                }
            },
            {
                path: '500',
                component: Error500Component,
                data: {
                    title: '服务器错误'
                }
            }
        ]
    }
];

export const ErrorRoutes: ModuleWithProviders = RouterModule.forChild(routes);

