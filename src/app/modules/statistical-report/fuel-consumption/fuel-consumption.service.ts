import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class FuelConsumptionService {

  constructor(private authHttp: AuthService) { }

  // 燃油油耗列表
  OilSummary(data) {
    return this.authHttp.post(environment.baseUrl + 'ReportForms/OilSummary', data);
  }

  // 油耗报表导出
  OilSummaryExportExcle(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/OilSummaryExportExcle', data);
  }

  // 油耗详情
  OilSummaryDetail(data){
    return this.authHttp.post(environment.baseUrl + 'ReportForms/OilSummaryDetail', data);
  }

  // 油耗详情图表
  OilSummaryEverydayForChart(data){
    return this.authHttp.post(environment.baseUrl + 'ReportForms/OilSummaryEverydayForChart', data);
  }

  // 油耗详情列表
  OilSummaryEverydayPaged(data){
    return this.authHttp.post(environment.baseUrl + 'ReportForms/OilSummaryEverydayPaged', data);
  }

  // 油耗详情导出
  SingleOilSummaryExportExcel(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/SingleOilSummaryExportExcel', data);
  }

}


