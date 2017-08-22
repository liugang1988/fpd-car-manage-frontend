import { Injectable } from '@angular/core'; // 核心库-注入服务
import { AuthService } from '../../../services/auth.service';  // 鉴权
import { environment } from '../../../../environments/environment'; // 环境变量

// interface
import { LoginInterface } from '../interface/login.interface';
import { CollectUserInfo } from '../interface/collectUserInfo.interface';


@Injectable()
export class AccountService {
  constructor(private authHttp: AuthService) { }

  // 登录
  login(from: LoginInterface) {
    return this.authHttp.post(environment.baseUrl + 'Account/Login', from);
  }


  // 收集用户注册信息
  collectUserInfo(from: CollectUserInfo) {
    return this.authHttp.post(environment.baseUrl + 'Account/CollectUserInfo', from);
  }

  // 第三方获取ip
  getIpAddr(){
    return this.authHttp.jsonpGet('http://freegeoip.net/json/');
  }
  
}




