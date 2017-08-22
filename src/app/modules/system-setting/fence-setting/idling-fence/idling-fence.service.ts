import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';



@Injectable()
export class IdlingFenceService {

  constructor(private authHttp: AuthService) { }

  // Idle 怠速栅栏信息
  GetIdleFenceRuleSetting() {
    return this.authHttp.get(environment.baseUrl + 'Fence/GetIdleFenceRuleSetting');
  }

  // 恢复怠速默认值
  RecoverIdelFence() {
    return this.authHttp.get(environment.baseUrl + 'Fence/RecoverIdelFence');
  }

  // 修改 怠速栅栏
  UpdateIdelFence(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/UpdateIdelFence', data);
  }

  // 	获取怠速栅栏修改日志
  GetPageIdleFenceLogs(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/GetPageIdleFenceLogs', data);
  }
}
