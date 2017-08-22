import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class UpgradeManageService {

  constructor(private authHttp: AuthService) { }

  // 获取升级操作列表
  GetList(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceUpdate/GetList', data);
  }

  // 获取升级记录 (KeyValue 为设备ID)
  GetUpdateRecordList(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceUpdate/GetUpdateRecordList', data);
  }

  // 更新设备
  Update(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceUpdate/Update', data);
  }

  // 获取设备状态枚举(运气，休眠，离线)
  DeviceEnum() {
    return this.authHttp.get(environment.baseUrl + 'SysBasic/DeviceEnum');
  }
}
