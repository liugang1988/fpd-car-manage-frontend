import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class VehicleOverviewService {

  constructor(private authHttp: AuthService) { }

  // 统计所有车辆里程和油耗
  StatisticsTrackInfoAndOil() {
    return this.authHttp.get(environment.baseUrl + 'TrackInfo/StatisticsTrackInfoAndOil');
  }

  // 获取每日怠速及行驶油耗
  TrackAndIdilOilForDays(data) {
    return this.authHttp.post(environment.baseUrl + 'TrackInfo/TrackAndIdilOilForDays', data);
  }

  // 获取安全警报
  GetAlertStatistics(){
    return this.authHttp.get(environment.baseUrl + 'SecurityAlarm/GetAlertStatistics');
  }

  // 车况监控
  VehiclesFaultsStatistics(){
    return this.authHttp.get(environment.baseUrl + 'VehicleFault/VehiclesFaultsStatistics');
  }

}
