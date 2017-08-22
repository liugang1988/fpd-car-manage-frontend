import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UcenterRoutes } from './ucenter.routers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




// 公共模块
import { MitTableModule } from '../../widgets/mit-table/mit-table.module';
import { MitTabsModule } from '../../widgets/mit-tabs/mit-tabs.module';
const mitModule = [
  MitTabsModule,
  MitTableModule
];

//  页面
import { UcenterComponent } from './ucenter.component';
import { PersonalCenterComponent } from './pages/personal-center/personal-center.component';
import { SystemMessageComponent } from './pages/system-message/system-message.component';
const page = [
  UcenterComponent,
  PersonalCenterComponent,
  SystemMessageComponent
];


// 服务
import { PersonalCenterService } from './pages/personal-center/personal-center.service';
import { SystemMessageService } from './pages/system-message/system-message.service';




@NgModule( {
  declarations: [
    ...page
  ],
  imports: [
    ...mitModule,
    CommonModule,
    ReactiveFormsModule,
    UcenterRoutes,
    FormsModule
  ],
  providers: [ PersonalCenterService, SystemMessageService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UcenterModule { };
