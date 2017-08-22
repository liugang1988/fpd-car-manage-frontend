import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 路由注入
import { OperateLogRoutes } from './operate-log.routes';

// 页面
import { OperateLogComponent } from './operate-log.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const page = [
  OperateLogComponent,
  DetailComponent,
  ListComponent
];

// 公用组件
import { MitEhartsModule } from '../../../../widgets/mit-echarts/mit-echarts.module';
import { MitDataTableModule } from '../../../../widgets/mit-data-table/mit-data-table.module';
import { MitLoadingModule } from '../../../../widgets/mit-loading/mit-loading.module';
const mitModule = [
  MitEhartsModule,
  MitDataTableModule,
  MitLoadingModule

];

// 服务
import { OperateLogService } from './operate-log.service';

@NgModule({
  imports: [
    CommonModule,
    OperateLogRoutes,
    ...mitModule,
    FormsModule
  ],
  declarations: [
    ...page
  ],
  providers: [ OperateLogService ]
})
export class OperateLogModule { }
