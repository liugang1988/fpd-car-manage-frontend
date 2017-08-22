import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SpeedFenceService {

  constructor(private authHttp: AuthService) { }

  // 超速栅栏 增加，更新~~~~~~~~
  AddOrUpdateSpeedFenceSetting(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/AddOrUpdateSpeedFenceSetting', data);
  }

  // 超速栅栏详细 》》》》
  GetSpeedFenceSettingByFenceId(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/GetSpeedFenceSettingByFenceId', data);
  }

  // 超速栅栏列表 ********
  GetPageSpeedFenceRuleList(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/GetPageSpeedFenceRuleList', data);
  }

  // 删除栅栏 （公用）
  DeleteFence(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/DeleteFence', data);
  }

  // 获取栅栏关联车辆 （公用）
  GetPageRelatedVehicles(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/GetPageRelatedVehicles', data);
  }

  // 获取未绑定当前栅栏的车辆信息 （公用）
  GetPageVehiclesWithoutCurFence(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/GetPageVehiclesWithoutCurFence', data);
  }

  // 给栅栏关联车辆 （公用）
  AddFenceVehicles(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/AddFenceVehicles', data);
  }

  // 更新栅栏状态
  UpdateFenceStatus(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/UpdateFenceStatus', data);
  }

  // 删除栅栏关联车辆
  DeleteFenceVehicles(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/DeleteFenceVehicles', data);
  }
}
