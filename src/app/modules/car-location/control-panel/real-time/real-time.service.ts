import { Injectable } from '@angular/core';   // 服务注入模块
import { AuthService } from '../../../../services/auth.service'; //  权限登录接口
import { environment } from '../../../../../environments/environment'; // 环境


@Injectable()
export class RealTimeService {

  constructor( private authHttp: AuthService ) { }
  // 获取单车实时数据
  // {Did:1}
  TrackRealTimeInfo( data ) {
    return this.authHttp.post( environment.baseUrl + 'TrackInfo/TrackRealTimeInfo', data );
  }
  // OBD状态判断
  GetVehicleSpecificStatus(data){
    return this.authHttp.post( environment.baseUrl + 'SysBasic/GetVehicleSpecificStatus', data );
  }
}
