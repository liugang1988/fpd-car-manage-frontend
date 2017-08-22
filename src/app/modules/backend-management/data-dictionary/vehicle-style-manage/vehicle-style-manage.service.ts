import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class VehicleStyleManageService {

  constructor(private authHttp: AuthService) { }

  // 车型列表
  GetPageVehicleModelList(data){
    return this.authHttp.post( environment.baseUrl + 'Vehicle/GetPageVehicleModelList', data);
  }

  // 添加车型
  AddVehicleModel(data){
    return this.authHttp.post( environment.baseUrl + 'Vehicle/AddVehicleModel', data )
  }

  // 获取品牌列表
  VehicleBrandList(){
    return this.authHttp.get( environment.baseUrl + 'Vehicle/VehicleBrandList' )
  }

  // 获取车系列表
  VehicleLineList(data){
    return this.authHttp.post( environment.baseUrl + 'Vehicle/VehicleLineList', data )
  }

}
