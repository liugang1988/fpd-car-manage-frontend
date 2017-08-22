import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class VehicleOffLineService {

  constructor(private authHttp: AuthService) { }

  // 车辆离线列表
  OffLineSummary(data){
    return this.authHttp.post(environment.baseUrl + 'ReportForms/OffLineSummary', data);
  }

  // 离线时间段枚举
  OffLineEnum(){
    return this.authHttp.get(environment.baseUrl + 'SysBasic/OffLineEnum');
  }

  // 车辆离线列表导出
  OfflineSummaryExcel(data){
    return this.authHttp.download(environment.baseUrl + 'ExportExcel/OfflineSummary', data);
  }
}
