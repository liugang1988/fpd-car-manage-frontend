import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class DailyCarService {

  constructor(private authHttp: AuthService) { }

  // 获取报表-月份出车统计
  VehicleMileageAndOilSummaryList(data) {
    return this.authHttp.post(environment.baseUrl + 'ReportForms/VehicleMileageAndOilSummaryList', data);
  }

  // 获取报表-单日出车统计
  VehicleMileageAndOilSummaryListForDay(data) {
    return this.authHttp.post(environment.baseUrl + 'ReportForms/VehicleMileageAndOilSummaryListForDay', data);
  }

  // 获取报表-里程油耗概况里的单日期出车率汇总(参数只需要传日期和所属部门)
  SingleVehicleMileageAndOilSummaryForDay(data) {
    return this.authHttp.post(environment.baseUrl + 'ReportForms/SingleVehicleMileageAndOilSummaryForDay', data);
  }

  // 每日出车导出
  VehicleSummaryExportExcle(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/VehicleSummaryExportExcle', data);
  }

  // 每日出车详情导出
  VehicleMileageAndOilSummaryForDayExport(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/VehicleMileageAndOilSummaryForDayExport', data);
  }
}


