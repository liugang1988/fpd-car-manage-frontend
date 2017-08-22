import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class DriverRankService {

  constructor(private authHttp: AuthService) { }

  // 驾驶员排名列表
  GetPageDriverScores(data){
    return this.authHttp.post(environment.baseUrl + 'ReportForms/GetPageDriverScores', data);
  }

  // 驾驶员评分导出
  DriverScoresExportExcle(data){
    return this.authHttp.download(environment.baseUrl + 'ReportForms/DriverScoresExportExcle', data);
  }


}


