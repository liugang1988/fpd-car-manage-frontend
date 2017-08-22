import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class CarLocationService {

  constructor(private authHttp: AuthService) { }


  // 	获取所有车辆的位置
  // -1 全部 1 运行  2 离线 0 停止
  VehiclePosition(stateCode) {
    const data = { DeviceStatus: stateCode };
    return this.authHttp.post(environment.baseUrl + 'TrackInfo/VehiclePosition', data);
  }

  // 获取不同状态的车辆位置数量
  // -1 全部 1 运行  2 离线 0 停止
  VehiclePostionCount() {
    return this.authHttp.get(environment.baseUrl + 'TrackInfo/VehiclePostionCount');
  }

  // 获取选中车辆位置详细信息
  // {Did: 0}
  VehiclePositionDetail(Did) {
    const data = { Did: Did };
    return this.authHttp.post(environment.baseUrl + 'TrackInfo/VehiclePositionDetail', data);
  }

  // 获取单车实时数据(实时轨迹)
  TrackRealTimeInfo(data) {
    return this.authHttp.post(environment.baseUrl + 'TrackInfo/TrackRealTimeInfo', data);
  }

}
