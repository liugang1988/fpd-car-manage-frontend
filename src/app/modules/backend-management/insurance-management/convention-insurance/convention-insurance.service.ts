import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ConventionInsuranceService {

  constructor(private authHttp: AuthService) { }

  // 常规保险列表
  GetPageCommonInsuranceList(data) {
    return this.authHttp.post(environment.baseUrl + 'UBICommonInsurance/GetPageCommonInsuranceList', data);
  }

  // 常规保险详情
  GetCommonInsuranceDetail(data){
    return this.authHttp.post(environment.baseUrl + 'UBICommonInsurance/GetCommonInsuranceDetail', data);
  }

}
