import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class FatigueService {

  constructor(private authHttp: AuthService) { }

  // 疲劳驾驶的
  GetPageTiredDataList(data) {
    return this.authHttp.post(environment.baseUrl + 'FenceData/GetPageTiredDataList', data);
  }

  // 疲劳驾驶导出
  GetPageTiredDataListForExport(data){
    return this.authHttp.download(environment.baseUrl + 'FenceData/GetPageTiredDataListForExport', data);
  }
}
