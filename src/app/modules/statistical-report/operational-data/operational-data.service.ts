import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class OperationalDataService {

  constructor(private authHttp: AuthService) { }

  // 运营管控列表
  OperationControlSummary(data){
    return this.authHttp.post(environment.baseUrl + 'ReportForms/OperationControlSummary', data);
  }

  // 运营管控导出
  OperationControlSummaryExportExcle(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/OperationControlSummaryExportExcle', data);
  }

}


