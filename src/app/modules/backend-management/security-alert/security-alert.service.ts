import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { Jsonp } from '@angular/http'; // http模块

@Injectable()
export class SecurityAlertService {

  constructor(
    private authHttp: AuthService,
    private _jsonp: Jsonp
  ) { }

  // 报警处理分页数据
  GetAllPageAlertRecordList( data ) {
    return this.authHttp.post( environment.baseUrl + 'SecurityAlarm/GetAllPageAlertRecordList', data );
  }

  // 警报自行处理
  ProcessAlarmBySelf( data ) {
    return this.authHttp.post( environment.baseUrl + 'SecurityAlarm/ProcessAlarmBySelf', data );
  }

  // 警报通知处理
  ProcessAlarmByNotice( data ) {
    return this.authHttp.post( environment.baseUrl + 'SecurityAlarm/ProcessAlarmByNotice', data );
  }

  // 根据当前用户，获取用户所能看到的用户列表
  GetUserList() {
    return this.authHttp.get( environment.baseUrl + 'Account/GetUserList' );
  }

  // 根据报警id获取相关车辆信息
  GetAlertRelationDriverInfo( data ) {
    return this.authHttp.post( environment.baseUrl + 'SecurityAlarm/GetAlertRelationDriverInfo', data );
  }

  // 获取报警处理详情
  GetAlertProcessingDetails( data ) {
    return this.authHttp.post( environment.baseUrl + 'SecurityAlarm/GetAlertProcessingDetails', data );
  }

  // 报警详情
  GetDetail( data ) {
    return this.authHttp.get( environment.baseUrl + 'AlertEventDetail/GetDetail' + data );
  }


  // 经纬度转物理地址-百度地图
  getAddress( lat, lng ) {
    const url = `http://api.map.baidu.com/geocoder/v2/?ak=B83hQj5Nx0x7gA5RQLEaCD11W6IElNQa&callback=JSONP_CALLBACK&location=${lat},${lng}&output=json&pois=1`;
    return this._jsonp.get( url ).map(( res ) => res.json() );
  }

}
