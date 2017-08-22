import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// 公共组件
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
const mitModule = [
  MitLoadingModule
];

// 服务
import { EventSetService } from './event-set.service';
const services = [
  EventSetService,
];

// 路由
import { EventSetRoutes } from './event-set.routes';

// 页面
import { EventSetComponent } from './event-set.component';

@NgModule({
  declarations: [
    EventSetComponent
  ],
  imports: [
    ...mitModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    EventSetRoutes
  ],
  providers: [
    ...services
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventSetModule { }
