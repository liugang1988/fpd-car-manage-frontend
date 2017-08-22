import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class InsuranceCompanyService {

  constructor(
    private authHttp: AuthService
  ) { }

  // 保险公司列表
  InsuranceCompanyList(data) {
    return this.authHttp.post( environment.baseUrl + '', data );
  }

  // 启用公司、禁用公司
  UpdateInsuranceCompanyStatus(data) {
    return this.authHttp.post( environment.baseUrl + '', data );
  }

  // 获取详细信息
  DetailInsuranceCompanyInfo(data) {
    return this.authHttp.post( environment.baseUrl + '', data );
  }

  // 修改保险公司信息
  UpdateInsuranceCompanyInfo(data) {
    return this.authHttp.post( environment.baseUrl + '', data );
  }

  // 新增保险公司信息
  AddInsuranceCompanyInfo(data) {
    return this.authHttp.post( environment.baseUrl + '', data );
  }

}
