import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class UserRegisterManageService {

  constructor(private authHttp: AuthService) { }

  // 用户注册列表
  CollectUserList(data){
    return this.authHttp.post(environment.baseUrl + 'Account/CollectUserList' , data);
  }

  // 处理注册用户
  DealCollectUser(data){
    return this.authHttp.post(environment.baseUrl + 'Account/DealCollectUser' , data);
  }

  // 删除注册用户
  DeleteCollectUser(data){
    return this.authHttp.post(environment.baseUrl + 'Account/DeleteCollectUser' , data);
  }

  // 状态枚举
  DealStatusEnum(){
    return this.authHttp.get(environment.baseUrl + 'SysBasic/DealStatusEnum');
  }

  // 处理信息
  DealCollectUserResult(data){
    return this.authHttp.post(environment.baseUrl + 'Account/DealCollectUserResult' , data);
  }

}
