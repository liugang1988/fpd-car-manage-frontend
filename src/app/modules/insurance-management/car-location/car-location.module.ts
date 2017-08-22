import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarLocationRoutes } from './car-location.routes';
import { CarLocationComponent } from './car-location.component';


// 公共模块
import { SettingModule } from './component/setting/setting.module';
import { LoadingModule } from './component/loading/loading.module';
import { CarStatusModule } from './component/car-status/car-status.module';
import { AdvancedSearchModule } from './component/advanced-search/advanced-search.module';
import { FastSearchModule } from './component/fast-search/fast-search.module';
import { MitLoadingModule } from '../../../widgets/mit-loading/mit-loading.module';
import { MitBaiduMapModule } from '../../../widgets/mit-baidu-map/mit-baidu-map.module';
import { MitAlertModule } from '../../../widgets/mit-alert/mit-alert.module';
import { MapEventFilterModule } from '../../../share/map-event-filter/map-event-filter.module';
import { GradientPathIntroModule } from '../../../share/gradient-path-intro/gradient-path-intro.module';
import { UbiHistoryInsuranceModule } from './component/ubi-history-insurance/ubi-history-insurance.module';
import { UbiRealTimeInsuranceModule } from './component/ubi-real-time-insurance/ubi-real-time-insurance.module';

// 服务
import { CarLocationService } from './car-location.service';



@NgModule({
  imports: [
    MitBaiduMapModule,
    LoadingModule,
    FastSearchModule,
    CarStatusModule,
    AdvancedSearchModule,
    CommonModule,
    CarLocationRoutes,
    MitLoadingModule,
    MitAlertModule,
    SettingModule,
    MapEventFilterModule,
    GradientPathIntroModule,
    UbiHistoryInsuranceModule,
    UbiRealTimeInsuranceModule
  ],
  declarations: [CarLocationComponent],
  providers: [
    CarLocationService
  ]
})
export class CarLocationModule { }
