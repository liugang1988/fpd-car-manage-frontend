import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';


@Injectable()
export class MitTaskBoxService {

  constructor( private authHttp: AuthService ) { }

  // 	获取报警数量统计
  GetAlertStatistics() {
    return this.authHttp.get( environment.baseUrl + 'SecurityAlarm/GetAlertStatistics' );
  }




}
