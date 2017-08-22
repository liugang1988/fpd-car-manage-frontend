import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class DrivingBehaviorService {

  constructor(private authHttp: AuthService) { }

  // 驾驶行为列表
  GetDrivingBehaviorSummary(data){
    return this.authHttp.post(environment.baseUrl + 'ReportForms/DrivingBehaviorSummary', data);
  }

  // 驾驶行为导出
  DrivingBehavior(data){
    return this.authHttp.download(environment.baseUrl + 'ExportExcel/DrivingBehavior', data);
  }
}


