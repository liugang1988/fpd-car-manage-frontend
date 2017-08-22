import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class VehicleSeriesManageService {

  constructor(private authHttp: AuthService) { }

  // 车系列表
  GetPageVehicleLineList(data){
    return this.authHttp.post( environment.baseUrl + 'Vehicle/GetPageVehicleLineList', data);
  }

  // 添加车系
  AddVehicleLine(data){
    return this.authHttp.post( environment.baseUrl + 'Vehicle/AddVehicleLine', data )
  }

  // 获取品牌列表
  VehicleBrandList(){
    return this.authHttp.get( environment.baseUrl + 'Vehicle/VehicleBrandList' )
  }

}
