import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class PersonalCenterService {

  constructor(private authHttp: AuthService) { }


  // 获取用户基本信息
  GetUserBasicInfo(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/GetUserInfo', data);
  }

  // 更新用户基本信息
  UpdateUserBasicInfo(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/UpdateUserBasicInfo', data);
  }

  // 修改用户密码
  ModifyUserPassword(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/ModifyUserPassword', data);
  }
}
