import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class EventSetService {

  constructor(private authHttp: AuthService) { }

  // 获取事件设置分组
  GetAlertSettingList() {
    return this.authHttp.get(environment.baseUrl + 'SysBasic/GetAlertSettingList');
  }

  // 单个事件状态修改
  UpdateSingleAlertSetting(data){
    return this.authHttp.post(environment.baseUrl + 'SysBasic/UpdateSingleAlertSetting', data);
  }

  // 更新大类状态
  UpdateOneKindAlertSetting(data){
    return this.authHttp.post(environment.baseUrl + 'SysBasic/UpdateOneKindAlertSetting', data);
  }

}