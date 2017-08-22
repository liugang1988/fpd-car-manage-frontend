### Project summary
Fpd-car-manage-frontend

脚印数据车辆管理系统


Auth by Junchao Zheng \ Qunhe Lin \ Gang Liu

-----------


### Development Environment

1. Download and Install nodejs 6.X / 7.X
  - `https://nodejs.org/zh-cn/`

2. Install cnpm
  - `npm install -g cnpm --registry=https://registry.npm.taobao.org`

3. Install angular-cli ( use 1.0.0 release)
  - `cnpm  install -g @angular/cli`

4. Install Typescript
 - `cnpm install typescript -g`

5. Enter Project Directory
 - `cd fpd-car-manager-frontend`

6. excute command(Install depend)
 - `cnpm install`

7. Start Development Mode
 - `ng serve`

-------------------


  **`package.json` upgrade , please excute  under command**
  - global install  `rimarf`[delete local project all node_modules] || `rm -rf `[like unix Environment]
  - then excute 1~7 step;


### Development Mode && Product Mode

8. Start Development Mode || Create [component/directive/pipe/service/class]
  - `ng serve || ng g [component/directive/pipe/service/class] name`

9. Package  Project(Prod Model) -- inner excute opimitize && chunk && depend anlayze ||  frist screen full start
  - `ng build || ng build --prod [-aot]`


### Other Angular-cli config command

| create | command |
|:--:|:--:|
|Component|ng g component my-new-component|
|Directive|ng g directive my-new-directive|
|Pipe|ng g pipe my-new-pipe|
|Service|ng g service my-new-service|
|Class|ng g class my-new-class|
|Interface|ng g interface my-new-interface|
|Enum|ng g enum my-new-enum|
|Module|ng g module my-module|

------------

### Router Design

为了便于拓展及维护，路由有分为主路由及模块路由;
- 主路由为`app.routes.ts`, 负责初始化整个系统的各大版块，按需加载(懒加载)
- 版块功能点大多大多以模块路由为主，方便拓展及维护

###### Main Routes
```javascript
const routes: Routes = [
  {
    path: '',
    redirectTo: '/page/dashboard/vehicle-overview',
    pathMatch: 'full',
    data: {
      title: '首页'
    }
  },
  {
    path: 'page',
    component: MitLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'ucenter', loadChildren: 'app/modules/ucenter/ucenter.module#UcenterModule' },
      { path: 'base-data', loadChildren: 'app/modules/base-data/base-data.module#BaseDataModule' },
      { path: 'backend-management', loadChildren: 'app/modules/backend-management/backend-management.module#BackendManagementModule' },
      { path: 'car-location', loadChildren: 'app/modules/car-location/car-location.module#CarLocationModule' },
      { path: 'intelligent-operating', loadChildren: 'app/modules/intelligent-operating/intelligent-operating.module#IntelligentOperatingModule' },
      { path: 'statistical-report', loadChildren: 'app/modules/statistical-report/statistical-report.module#StatisticalReportModule' },
      { path: 'system-setting', loadChildren: 'app/modules/system-setting/system-setting.module#SystemSettingModule' },
      { path: 'vehicle-management', loadChildren: 'app/modules/vehicle-management/vehicle-management.module#VehicleManagementModule' }
    ]
  },
  { path: 'account', loadChildren: 'app/modules/account/account.module#AccountModule' }, // 账号相关
  { path: 'error', loadChildren: 'app/modules/error/error.module#ErrorModule' }, // 错误
  { path: 'not-found', redirectTo: 'error/404' }, // 404
  { path: '**', redirectTo: 'error/404' } //
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

```

###### Module Routes
    以基础数据为例
```javascript
    const routes: Routes = [
        {
            path: '',
            component: MitLayoutComponent,
            data: {
                title: '基础数据'
            },
            children: [{
                path: 'base-data',
                component: BaseDataComponent,
                children: [
                    {
                        path: 'car-infomation',
                        component: CarInfomationComponent,
                        data: {
                            title: '车辆信息'
                        }
                    }
                ]
            }]
        }
    ];
    export const BaseDataRoutes: ModuleWithProviders = RouterModule.forChild(routes);
```


------------

### Project Tree(Base)
```Fpd-car-manage-frontend
src
├─app
│  ├─animation // 动画
│  ├─rbac // 鉴权
│  ├─share // 共享组件
│  ├─modules //模块
│  │  ├─background-management
│  │  ├─base-data
│  │  ├─car-location
│  │  ├─dashboard
│  │  ├─intelligent-operating
│  │  ├─statistical-report
│  │  ├─system-setting
│  │  └─...等等
│  ├─services  //公共服务
│  └─widgets   //公共组件
│      ├─mit-header
│      ├─mit-layout
│      └─mit-sidebar
├─assets //资源(图片等)
└─environments //全局环境变量[开发,生产]
```
------------

### 其他注意要点

- 全局的iconfont使用阿里的 --- 若是自己有购买cdn,可以托管到自己的cdn上
- 浏览器版本过低是跳转到七牛cdn --- 跳转路径可以修改`ngxin`替换
- 车辆/司机/设备导入文档也是放在七牛cdn --- 公司自行去买然后替换
- 部分js的引入是使用了国内的cdn引入【bootcdn: echarts】



-----------


