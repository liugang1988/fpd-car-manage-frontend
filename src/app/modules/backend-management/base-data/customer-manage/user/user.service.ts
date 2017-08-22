import { Injectable } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { environment } from '../../../../../../environments/environment';


@Injectable()
export class UserService {

  constructor(private authHttp: AuthService) { }


  // 获取单个组织(公司)信息
  GetSingleOrganization(data) {
    return this.authHttp.post(environment.baseUrl + 'Organization/GetSingleOrganization', data);
  }

  // 用户列表数据
  GetUserList(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/GetUserList', data);
  }


  // 新建用户
  AddUser(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/AddUser', data);
  }


  // 更新用户
  UpdateUser(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/UpdateUserInfo', data);
  }

  // 获取账号信息
  GetUserInfo(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/GetUserInfo', data);
  }

  // 更新用户状态
  UpdateUserStatus(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/UpdateUserStatus', data);
  }


  // 分配角色至用户
  AllotRolesToUser(data) {
    return this.authHttp.post(environment.baseUrl + 'Role/AllotRolesToUser', data);
  }



}
