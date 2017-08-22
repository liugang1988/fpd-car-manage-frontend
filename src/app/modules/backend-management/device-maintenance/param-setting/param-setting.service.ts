import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ParamSettingService {

  constructor(private authHttp: AuthService) { }

  // 获取设备列表
  DeviceParamList(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceParam/DeviceParamList', data);
  }

  // 获取单个设备的参数设置
  SingleDeviceParam(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceParam/SingleDeviceParam', data);
  }
  // 设置参数
  DeviceParamSet(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceParam/DeviceParamSet', data);
  }

  // 获取设备状态枚举(运行，休眠，离线)
  DeviceEnum() {
    return this.authHttp.get(environment.baseUrl + 'SysBasic/DeviceEnum');
  }

  // 设备库详情(包含车辆详情)
  DeviceDetail(data) {
    return this.authHttp.post(environment.baseUrl + 'Device/DeviceDetail', data);
  }

  // 设置OBD状态
  SwitchOBD(data){
    return this.authHttp.post(environment.baseUrl + 'DeviceParam/SwitchOBD', data);
  }
}
