import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class UbiInsuranceService {

  constructor(private authHttp: AuthService) { }

  // 常规保险列表
  GetUbiInsuranceList(data) {
    return this.authHttp.post(environment.baseUrl + 'UBICommonInsurance/GetPageCommonInsuranceList', data);
  }

  // ubi保险列表
  GetUBIInsuranceList(data){
    return this.authHttp.post(environment.baseUrl + 'UBIInsurance/UBIInsuranceList', data);
  }

  // 获取ubi模型列表
  GetUBIModelList(){
    return this.authHttp.get(environment.baseUrl + 'UBIModel/UBIEnabledModelList');
  }

  // 生成ubi保单
  AddUBIInsurance(data){
    return this.authHttp.post(environment.baseUrl + 'UBIInsurance/AddUBIInsurance', data);
  }

  // 常规保险详情
  GetCommonInsuranceDetail(data){
    return this.authHttp.post(environment.baseUrl + 'UBICommonInsurance/GetCommonInsuranceDetail', data);
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
