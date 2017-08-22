import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GuaranteeManagementService {

  constructor(private authHttp: AuthService) { }

  // ubi保单列表
  GetGuaranteeList(data){
    return this.authHttp.post(environment.baseUrl + 'UBIInsurance/UBIInsuranceListForFront', data);
  }

  // ubi保单详情
  GetUBIInsuranceDetail(data){
    return this.authHttp.post(environment.baseUrl + 'UBIInsurance/UBIInsuranceDetail', data);
  }

  // ubi保险管理明细
  GetUBIInsuranceItem(data){
    return this.authHttp.post(environment.baseUrl + 'UBIInsurance/UBIInsuranceItem', data);
  }

  // 按时间段查询ubi实际保费
  GetActualUBIForTime(data){
    return this.authHttp.post(environment.baseUrl + 'UBIInsurance/GetActualUBIForTime', data);
  }
  
  // ubi保费明细详情
  GetTrackUBIInsurance(data){
    return this.authHttp.post(environment.baseUrl + 'UBIInsurance/GetTrackUBIInsurance', data);
  }

  // 获取历史行程轨迹
  TrackTrajectory( data ) {
    return this.authHttp.post( environment.baseUrl + 'TrackInfo/TrackTrajectory', data );
  }
}
