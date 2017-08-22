import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http'; // http模块
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class MobileAlarmService {
  public headers: Headers;
  constructor( private http: Http ) { }


  // 	警报自行处理
  ProcessAlarmBySelf( data, token ) {
    const headers = new Headers( { 'token': token });
    return this.http.post( environment.baseUrl + 'SecurityAlarm/ProcessAlarmBySelf', data, new RequestOptions( { headers: headers }) ).map( res => res.json() ).catch( this.handleError );
  }

  // 获取单条报警的状态信息
  GetAlertBasicInfo( data, token ) {
    const headers = new Headers( { 'token': token });
    return this.http.post( environment.baseUrl + 'SecurityAlarm/GetAlertBasicInfo', data, new RequestOptions( { headers: headers }) ).map( res => res.json() ).catch( this.handleError );
  }

  // 错误事件
  private handleError( error: Response ) {
    return Observable.throw( error.json() || 'Server Error' );
  }
}
