import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class SimManageService {

  constructor(private authHttp: AuthService) { }

  GetSIM(data) {
    return this.authHttp.post(environment.baseUrl + 'SIM/SIMList', data);
  }

  AddSIM(data) {
    return this.authHttp.post(environment.baseUrl + 'SIM/AddSIM', data);
  }
}
