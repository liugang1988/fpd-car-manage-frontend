import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth.service';

@Injectable()
export class AppVersionManageService {

  constructor(
    private authHttp: AuthService
  ) { }

  VersionList(data) {
    return this.authHttp.post(environment.baseUrl + 'AppVersion/VersionList', data);
  }


  AddVersion(data) {
    return this.authHttp.post(environment.baseUrl + 'AppVersion/AddVersion', data);
  }


  UpdateVersion(data) {
    return this.authHttp.post(environment.baseUrl + 'AppVersion/UpdateVersion', data);
  }

  SingleVersion(data) {
    return this.authHttp.post(environment.baseUrl + 'AppVersion/SingleVersion', data);
  }



}
