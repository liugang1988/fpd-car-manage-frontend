import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';



@Injectable()
export class DriverManagementService {

  constructor(private authHttp: AuthService) { }

  // 首页概况-驾驶员管理
  GetAllDriverStatistics() {
    return this.authHttp.get(environment.baseUrl + 'Driver/GetAllDriverStatistics');
  }

  // 获取首页驾驶员驾驶行为分数比例
  DriverStatics(data) {
    return this.authHttp.post(environment.baseUrl + 'Driver/DriverStatics', data);
  }
  
}
