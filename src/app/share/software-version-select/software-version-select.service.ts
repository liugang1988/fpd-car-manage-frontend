import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SoftwareVersionSelectService {

  constructor( private authHttp: AuthService ) { }
  // 供应商列表(不分页)
  GetFirmwarmList() {
    return this.authHttp.get( environment.baseUrl + 'Firmware/GetFirmwarmList' );
  }

}
