import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class ElectricFenceService {

  constructor(private authHttp: AuthService) { }

  // 电子围栏列表
  GetPageElectronicFenceRuleList(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/GetPageElectronicFenceRuleList', data);
  }


  // 新增电子围栏
  AddOrUpdateElectronicFenceSetting(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/AddOrUpdateElectronicFenceSetting', data);
  }


  // 电子围栏详情
  GetElectronicFenceSettingByFenceId(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/GetElectronicFenceSettingByFenceId', data);
  }

  // 更新状态
  UpdateFenceStatus(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/UpdateFenceStatus', data);
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

  // 删除栅栏关联车辆
  DeleteFenceVehicles(data) {
    return this.authHttp.post(environment.baseUrl + 'Fence/DeleteFenceVehicles', data);
  }


}
