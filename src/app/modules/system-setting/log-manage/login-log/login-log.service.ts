import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class LoginLogService {

  constructor(private authHttp: AuthService) { }

  // 登录日志列表
  GetLoadingLogs(data){
    return this.authHttp.post( environment.baseUrl + 'SysLogs/GetLoadingLogs', data);
  }
}
