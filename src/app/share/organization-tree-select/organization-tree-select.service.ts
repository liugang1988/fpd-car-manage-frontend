import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class OrganizationTreeSelectService {

  constructor( private authHttp: AuthService ) { }

  // 获取菜单列表
  GetCompanyTree(data) {
    return this.authHttp.post(environment.baseUrl + 'SysBasic/GetCompanyTree', data);
  }
}