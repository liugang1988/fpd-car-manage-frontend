import { Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class SystemMessageService {

  constructor(private authHttp: AuthService) { }

  // 更新用户基本信息
  UpdateUserBasicInfo(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/UpdateUserBasicInfo', data);
  }

  // 修改用户密码
  ModifyUserPassword(data) {
    return this.authHttp.post(environment.baseUrl + 'Account/ModifyUserPassword', data);
  }
}
