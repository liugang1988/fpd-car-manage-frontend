import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class SpeedFenceService {

  constructor(private authHttp: AuthService) { }

  // 超速列表
  GetPageSpeedDataList(data) {
    return this.authHttp.post(environment.baseUrl + 'FenceData/GetPageSpeedDataList', data);
  }

  // 超速列表导出
  GetPageSpeedDataListForExport(data){
    return this.authHttp.download(environment.baseUrl + 'FenceData/GetPageSpeedDataListForExport', data);
  }
}
