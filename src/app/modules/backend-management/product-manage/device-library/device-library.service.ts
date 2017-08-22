import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';
import { Jsonp } from '@angular/http'; // http模块

@Injectable()
export class DeviceLibraryService {

  constructor(private authHttp: AuthService, private _jsonp: Jsonp) { }

  // 设备库列表
  GetDeviceList(data) {
    return this.authHttp.post(environment.baseUrl + 'Device/DeviceList', data);
  }

  // 经纬度转物理地址-百度地图
  getAddress(lat, lng) {
    const url = `http://api.map.baidu.com/geocoder/v2/?ak=B83hQj5Nx0x7gA5RQLEaCD11W6IElNQa&callback=JSONP_CALLBACK&location=${lat},${lng}&output=json&pois=1`;
    return this._jsonp.get(url).map((res) => res.json());
  }



  // 设备详情（包含车辆详情）
  DetailDevice(data) {
    return this.authHttp.post(environment.baseUrl + 'Device/DeviceDetail', data);
  }

  // 获取设备状态枚举
  DeviceStatusEnum() {
    return this.authHttp.get(environment.baseUrl + 'SysBasic/DeviceStatusEnum');
  }

  // 获取设备状态枚举(运气，休眠，离线)
  DeviceEnum() {
    return this.authHttp.get(environment.baseUrl + 'SysBasic/DeviceEnum');
  }

  // 设备详情读取VIN
  GetDeviceVin(data){
    return this.authHttp.post(environment.baseUrl + 'Device/GetDeviceVin', data);
  }

  // 设备详情获取读取状态
  GetVinReadCommandExcuteResult(data){
    return this.authHttp.post(environment.baseUrl + 'Device/GetVinReadCommandExcuteResult', data);
  }
}
