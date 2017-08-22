import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class OperationManagementService {

  constructor(private authService: AuthService) { }

  // 运管统计
  OperationControlSummary(data){
    return this.authService.post(environment.baseUrl + 'ReportForms/OperationControlSummary', data);
  }

  // 导出
  OperationControlSummaryExportExcle(data){
    return this.authService.download(environment.baseUrl + 'ReportForms/OperationControlSummaryExportExcle', data);
  }

}
