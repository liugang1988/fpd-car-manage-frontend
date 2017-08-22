import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class HomeOverviewService {

  constructor(private authHttp: AuthService) { }

  // 首页车辆统计
  HomePageVehicle() {
    return this.authHttp.get(environment.baseUrl + 'Vehicle/HomePageVehicle');
  }
}
