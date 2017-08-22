import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProductTypeService {

  constructor(private authHttp: AuthService) { }

  GetDeviceModel(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceModel/DeviceModelList', data);
  }

  AddDeviceModel(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceModel/EditDeviceModel', data);
  }
}
