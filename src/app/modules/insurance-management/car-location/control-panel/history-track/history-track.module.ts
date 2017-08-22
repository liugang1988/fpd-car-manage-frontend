import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryTrackService } from './history-track.service';

// 路由注入
import { HistoryTrackRoutes } from './history-track.routes';


// 页面
import { HistoryTrackComponent } from './history-track.component';
const page = [
  HistoryTrackComponent
];


// 公用模块
import { MitAlertModule } from '../../../../../widgets/mit-alert/mit-alert.module';
import { MitLoadingModule } from '../../../../../widgets/mit-loading/mit-loading.module';
import { MitPipeModule } from '../../../../../widgets/mit-pipe/mit-pipe.module';
import { SearchAreaModule  } from '../../component/search-area/search-area.module';
import { PlayControlModule } from '../../component/play-control/play-control.module';
@NgModule( {
  imports: [
    CommonModule,
    HistoryTrackRoutes,
    MitLoadingModule,
    MitAlertModule,
    MitPipeModule,
    SearchAreaModule,
    PlayControlModule
  ],
  declarations: [
    ...page
  ],
  providers: [
    HistoryTrackService
  ]
})
export class HistoryTrackModule { }
