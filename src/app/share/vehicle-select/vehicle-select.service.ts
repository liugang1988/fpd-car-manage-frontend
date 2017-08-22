import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class VehicleSelectService {

  constructor(private authHttp: AuthService) { }

  // 获取品牌
  GetVehicleBrandList() {
    return this.authHttp.get(environment.baseUrl + 'Vehicle/VehicleBrandList');
  }

  // 获取车系
  GetVehicleLineList(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/VehicleLineList', data);
  }
  // 获取车型
  GetVehicleModelList(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/VehicleModelList', data);
  }


}
