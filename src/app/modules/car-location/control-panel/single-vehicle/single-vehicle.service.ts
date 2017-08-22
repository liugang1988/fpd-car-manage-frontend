import { Injectable } from '@angular/core';   // 服务注入模块
import { AuthService } from '../../../../services/auth.service'; //  权限登录接口
import { environment } from '../../../../../environments/environment'; // 环境

@Injectable()
export class SingleVehicleService {

  constructor(private authHttp: AuthService) { }



  // 获取车辆实况详情
  // {Did:1}
  VehiclePositionInfo(Did) {
    const data = { Did: Did };
    return this.authHttp.post(environment.baseUrl + 'TrackInfo/VehiclePositionInfo', data);
  }

  // 获取单个驾驶员信息
  GetSingleDriver(Did) {
    const data = { DeviceId: Did };
    return this.authHttp.post(environment.baseUrl + 'Driver/GetDriverByDeviceId', data);
  }


  // 行程-车辆简单介绍
  Statistics(Did) {
    const data = { Did: Did };
    return this.authHttp.post(environment.baseUrl + 'Vehicle/Statistics', data);
  }


}
