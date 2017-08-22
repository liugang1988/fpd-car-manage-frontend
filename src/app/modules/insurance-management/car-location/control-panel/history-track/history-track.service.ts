import { Injectable } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { environment } from '../../../../../../environments/environment';


@Injectable()
export class HistoryTrackService {

  constructor(private authHttp: AuthService) { }

 // 获取历史行程轨迹
  TrackTrajectory( TrackId ) {
    const data = { TrackId: TrackId };
    return this.authHttp.post( environment.baseUrl + 'TrackInfo/TrackTrajectory', data );
  }

  TrackTrajectoryList(data?) {
    return this.authHttp.post(environment.baseUrl + 'TrackInfo/TrackTrajectoryList', data);
  }

  TrackEventCount(data) {
    return this.authHttp.post(environment.baseUrl + 'TrackInfo/TrackEventCount', data);
  }

  // 获取历史轨迹行程保费
  GetTrackDynamicPrenium(data){
    return this.authHttp.post(environment.baseUrl + 'UBIInsurance/GetTrackDynamicPrenium', data);
  }
}
