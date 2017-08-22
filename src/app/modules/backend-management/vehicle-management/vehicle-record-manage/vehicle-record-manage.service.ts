import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class VehicleRecordManageService {

  constructor(private authHttp: AuthService) { }

  // 车辆管理
  VehicleList(data) {
    return this.authHttp.post(environment.baseUrl + 'UBIVehicle/VehicleList', data);
  }
}
