import { Injectable } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { environment } from '../../../../../../environments/environment';




@Injectable()
export class CustomerService {

  constructor(private authHttp: AuthService) { }



  // 组织机构（公司）列表
  GetOrganizationList(data) {
    return this.authHttp.post(environment.baseUrl + 'Organization/GetOrganizationList', data);
  }

  // 添加组织/公司
  AddOrganization(data) {
    return this.authHttp.post(environment.baseUrl + 'Organization/AddOrganization', data);
  }


  // 获取单个公司信息
  GetSingleOrganization(data) {
    return this.authHttp.post(environment.baseUrl + 'Organization/GetSingleOrganization', data);
  }


  // 更新单个公司信息
  UpdateOrganizationDept(data) {
    return this.authHttp.post(environment.baseUrl + 'Organization/UpdateOrganization', data);
  }


  // 删除组织
  DeleteOrganization(data) {
    return this.authHttp.post(environment.baseUrl + 'Organization/DeleteOrganization', data);
  }


  // 更新公司状态
  UpdateOrgStatus(data) {
    return this.authHttp.post(environment.baseUrl + 'Organization/UpdateOrgStatus', data);
  }
}
