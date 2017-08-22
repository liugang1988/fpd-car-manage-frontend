import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AlertRecordEnumCheckboxService {

  constructor( private authHttp: AuthService ) { }

  AlertRecordEnum() {
    return this.authHttp.get(environment.baseUrl + 'SysBasic/AlertRecordEnum');
  }


}
