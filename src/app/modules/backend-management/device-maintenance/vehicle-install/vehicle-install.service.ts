import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class VehicleInstallService {

  constructor(private authHttp: AuthService) { }


  // 返回未绑定设备的车辆
  GetVehicleList(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceInstall/GetVehicleList', data);
  }

  // 返回未绑定车辆的设备
  GetDeviceList(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceInstall/GetDeviceList', data);
  }

  // 绑定安装
  InstallDevice(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceInstall/InstallDevice', data);
  }


  // 绑定安装通过IMEI
  InstallDeviceByIMEI(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceInstall/InstallDeviceByIMEI', data);
  }

  //  车辆绑定记录
  InstallRecordByVehicle(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceInstall/InstallRecordByVehicle', data);
  }

  //  设备解绑
  UnInstallDevice(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceInstall/UnInstallDevice', data);
  }

}
