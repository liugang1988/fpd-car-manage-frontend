import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class IdlingFenceService {

  constructor(private authHttp: AuthService) { }

  // 怠速列表
  GetPageIdleDataList(data) {
    return this.authHttp.post(environment.baseUrl + 'FenceData/GetPageIdleDataList', data);
  }

  // 怠速列表导出
  GetPageSpeedDataListForExport(data){
    return this.authHttp.download(environment.baseUrl + 'FenceData/GetPageIdleDataListForExport', data);
  }
}
