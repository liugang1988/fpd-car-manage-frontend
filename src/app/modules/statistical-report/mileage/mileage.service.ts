import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class MileageService {

  constructor(private authHttp: AuthService) { }

  // 里程统计列表
  MileageSummary(data) {
    return this.authHttp.post(environment.baseUrl + 'ReportForms/MileageSummary', data);
  }

  // 里程统计导出
  MileageSummaryExportExcel(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/MileageSummaryExportExcel', data);
  }

  // 里程统计详细
  MileageSummaryDetail(data) {
    return this.authHttp.post(environment.baseUrl + 'ReportForms/MileageSummaryDetail', data);
  }

  // 里程统计图表
  MileageSummaryForDay(data) {
    return this.authHttp.post(environment.baseUrl + 'ReportForms/MileageSummaryForDay', data);
  }

  // 里程统计详细列表
  MileageSummaryForTrafficData(data) {
    return this.authHttp.post(environment.baseUrl + 'ReportForms/MileageSummaryForTrafficData', data);
  }

  // 里程统计详情导出
  MileageSummaryForTrafficDataExcel(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/MileageSummaryForTrafficDataExcel', data);
  }
  
}


