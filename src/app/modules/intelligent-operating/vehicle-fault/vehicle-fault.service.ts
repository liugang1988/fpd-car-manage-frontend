import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class VehicleFaultService {

  constructor(private authHttp: AuthService) { }

  // 获取故障提示列表
  VehicleFaultList(data) {
    return this.authHttp.post(environment.baseUrl + 'VehicleFault/VehicleFaultList', data);
  }

  // 获取单个车辆的故障列表
  SingleVehicleFaultList(data) {
    return this.authHttp.post(environment.baseUrl + 'VehicleFault/SingleVehicleFaultList', data);
  }

  // 根据车辆ID获取单车信息
  VehicleDetail(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/VehicleDetail', data);
  }

  // 清除故障码
  ClearFault(data) {
    return this.authHttp.post(environment.baseUrl + 'VehicleFault/ClearFault', data);
  }

  // 故障列表导出
  VehicleFaultListExcel(data){
    return this.authHttp.download(environment.baseUrl + 'VehicleFault/VehicleFaultListExcel', data);
  }

}
