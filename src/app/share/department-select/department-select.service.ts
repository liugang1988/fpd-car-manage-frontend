import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class DepartmentSelectService {

  constructor(private authHttp: AuthService) { }


  // 根据公司ID获取部门树(OID)
  GetAllDeptTree(OID) {
    let data = {};
    if (OID) {
      data = { OID: OID };
    }
    return this.authHttp.post(environment.baseUrl + 'OrganizationDept/GetAllDeptTree', data);
  }

}
