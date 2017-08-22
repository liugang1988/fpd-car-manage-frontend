import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProductNumberService {

  constructor(private authHttp: AuthService) { }
  // 设备型号列表
  DeviceModelList(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceModel/DeviceModelList', data);
  }
  // 添加设备型号
  AddDeviceModel(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceModel/AddDeviceModel', data);
  }
  // 更新设备型号
  UpdateDeviceModel(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceModel/UpdateDeviceModel', data);
  }
  // 删除
  DeleteDeviceModel(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceModel/DeleteDeviceModel', data);
  }

  // 获取单个设备型号信息
  GetDeviceModel(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceModel/GetDeviceModel', data);
  }

  // 设备类型搜索
  DeviceCategory(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceModel/DeviceCategory', data);
  }

}
