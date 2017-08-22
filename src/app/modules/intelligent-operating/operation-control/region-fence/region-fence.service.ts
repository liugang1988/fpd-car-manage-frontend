import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class RegionFenceService {

  constructor(private authHttp: AuthService) { }

  // 区域栅栏列表
  GetPageAreaDataList(data) {
    return this.authHttp.post(environment.baseUrl + 'FenceData/GetPageAreaDataList', data);
  }

  // 区域栅栏导出
  GetGetPageAreaDataListForExport(data){
     return this.authHttp.download(environment.baseUrl + 'FenceData/GetGetPageAreaDataListForExport', data);
  }
}
