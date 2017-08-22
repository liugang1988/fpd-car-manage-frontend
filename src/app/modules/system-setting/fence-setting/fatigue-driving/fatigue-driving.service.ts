import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class FatigueDrivingService {

  constructor(private authHttp: AuthService) { }


  // Idle 怠速栅栏信息
  GetTiredFenceRuleSetting() {
    return this.authHttp.get(environment.baseUrl + 'Fence/GetTiredFenceRuleSetting');
  }

  // 恢复疲劳默认值
  RecoverTriedFenceFence() {
    return this.authHttp.get(environment.baseUrl + 'Fence/RecoverTriedFenceFence');
  }

  // 修改 疲劳栅栏
  UpdateTiredFence(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/UpdateTiredFence', data);
  }

  // 获取疲劳栅栏修改日志
  GetPageTiredFenceLogs(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/GetPageTiredFenceLogs', data);
  }
}
