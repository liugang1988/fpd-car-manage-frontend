import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class SecurityAlertsService {

  constructor(private authHttp: AuthService) { }

  // 安全报警列表
  AlertSummary(data){
    return this.authHttp.post(environment.baseUrl + 'ReportForms/AlertSummary', data);
  }

  // 安全报警导出
  AlertSummaryExportExcle(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/AlertSummaryExportExcle', data);
  }


}


