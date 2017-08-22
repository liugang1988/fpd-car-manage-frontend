import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserManageService {

  constructor( private authHttp: AuthService ) { }

  // 用户列表数据(分页)
  GetUserList( data ) {
    return this.authHttp.post( environment.baseUrl + 'Account/GetUserList', data );
  }

  // 新增用户
  AddUser( data ) {
    return this.authHttp.post( environment.baseUrl + 'Account/AddUser', data );
  }

  // 获取用户信息
  GetUserInfo( data ) {
    return this.authHttp.post( environment.baseUrl + 'Account/GetUserInfo', data );
  }

  // 更新用户信息
  UpdateUserInfo( data ) {
    return this.authHttp.post( environment.baseUrl + 'Account/UpdateUserInfo', data );
  }

  // 分配角色至用户
  AllotRolesToUser( data ) {
    return this.authHttp.post( environment.baseUrl + 'Role/AllotRolesToUser', data );
  }


  // 更新用户状态
  UpdateUserStatus( data ) {
    return this.authHttp.post( environment.baseUrl + 'Account/UpdateUserStatus', data );
  }

}
