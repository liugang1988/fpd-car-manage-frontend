import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class InsurancePriceService {

  constructor(private authHttp: AuthService) { }

  // 车辆信息
  GetVehicleDetail(data){
    return this.authHttp.post(environment.baseUrl + 'Vehicle/VehicleDetail', data)
  }

  // 获取保险项目列表
  GetUBICommonInsurance(){
    return this.authHttp.get(environment.baseUrl + 'UBICommonInsurance/InsuranceItemList');
  }

  // 常规保单核价
  InsurancePricing(data){
    return this.authHttp.post(environment.baseUrl + 'UBIVehicle/InsurancePricing', data)
  }

  // 近一年出险次数
  NearYearCompensateEnum(){
    return this.authHttp.get(environment.baseUrl + 'SysBasic/NearYearCompensateEnum');
  }

  // 连续未出险年数
  ContinueNoAccidentYears(){
    return this.authHttp.get(environment.baseUrl + 'SysBasic/ContinueNoAccidentYears');
  }

}
