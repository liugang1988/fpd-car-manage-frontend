import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';



@Injectable()
export class PeopleCarBindingService {

  constructor(private authHttp: AuthService) { }

  // 人车绑定
  BindDriverVehicle(data) {
    return this.authHttp.post(environment.baseUrl + 'Driver/BindDriverVehicle', data);
  }

  // 人车解绑
  UnBindDriverVehiclee(data) {
    return this.authHttp.post(environment.baseUrl + 'Driver/UnBindDriverVehicle', data);
  }


  // 人车绑定初始数据
  GetPageDriverVehicles(data) {
    return this.authHttp.post(environment.baseUrl + 'Driver/GetPageDriverVehicles', data);
  }


  // 司机绑定记录
  GetBindRecords(data) {
    return this.authHttp.post(environment.baseUrl + 'Driver/GetBindRecords', data);
  }


  // Excel档导入驾驶员
  UploadDriver(data) {
    return this.authHttp.post(environment.baseUrl + 'Driver/DriverExcel', data);
  }


  // 获取未绑定的车辆
  GetUnbindPageVehicles(data) {
    return this.authHttp.post(environment.baseUrl + 'Driver/GetUnbindPageVehicles', data);
  }
}
