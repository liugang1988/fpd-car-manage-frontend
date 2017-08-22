import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class ElectricFenceService {

  constructor(private authHttp: AuthService) { }

  // 电子围栏报表
  GetPageElctDataList(data){
    return this.authHttp.post(environment.baseUrl + 'FenceData/GetPageElctDataList', data);
  }

  // 电子围栏导出
  GetPageElctDataListForExport(data){
    return this.authHttp.download(environment.baseUrl + 'FenceData/GetPageElctDataListForExport', data);
  }

}
