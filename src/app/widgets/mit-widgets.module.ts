import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// 模块
import { MitEhartsModule } from './mit-echarts/mit-echarts.module';  // 百度图表
import { MitTabsModule } from './mit-tabs/mit-tabs.module'; // tab切换
import { MitLoadingModule } from './mit-loading/mit-loading.module'; // loading
import { MitUserBoxModule } from './mit-user-box/mit-user-box.module'; // 用户信息下拉
import { MitTaskBoxModule } from './mit-task-box/mit-task-box.module'; // 待办事项列表
import { MitLayoutModule } from './mit-layout/mit-layout.module'; // 布局模块
import { MitSelectAutocompleteModule } from './mit-select-autocomplete/mit-select-autocomplete.module'; // 自动补全
import { MitTableModule } from './mit-table/mit-table.module'; // table
import { MitDataTableModule } from './mit-data-table/mit-data-table.module'; // table
import { MitBaiduMapModule } from './mit-baidu-map/mit-baidu-map.module'; // 百度地图
import { MitBreadcrumbModule } from './mit-breadcrumb/mit-breadcrumb.module'; // 面包屑
import { MitAlertModule } from './mit-alert/mit-alert.module'; // 弹窗
import { MitUploadModule } from './mit-upload/mit-upload.module'; // 上传组件(图片，excel等)
import { MitPipeModule } from './mit-pipe/mit-pipe.module';
import { MitStarsModule } from './mit-stars/mit-stars.module';
import { MitModalModule} from './mit-modal/mit-modal.module';

const widgetsFnc = [
  MitEhartsModule,
  MitTabsModule,
  MitLoadingModule,
  MitLayoutModule,
  MitUserBoxModule,
  MitTaskBoxModule,
  MitSelectAutocompleteModule,
  MitTableModule,
  MitDataTableModule,
  MitBaiduMapModule,
  MitBreadcrumbModule,
  MitAlertModule,
  MitUploadModule,
  MitPipeModule,
  MitStarsModule,
  MitModalModule
];



@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    ...widgetsFnc
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: []
})
export class MitWidgetsModule { };
