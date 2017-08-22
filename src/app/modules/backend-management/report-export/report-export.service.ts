import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';  
import { environment } from '../../../../environments/environment'; 

@Injectable()
export class ReportExportService {

  constructor(private authHttp: AuthService) { }

  // 400报表导出
  TrackInfoForLease(data){
    return this.authHttp.download( environment.baseUrl + 'ExportExcel/TrackInfoForLease', data );
  }

}
