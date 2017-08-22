import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class DrivingDataService {

  constructor( private authHttp: AuthService ) { }

  AllTrafficData( data ) {
    return this.authHttp.post( environment.baseUrl + 'TrafficData/AllTrafficData', data );
  }

  SingleVehicleTrackInfo( data ) {
    return this.authHttp.post( environment.baseUrl + 'TrafficData/SingleVehicleTrackInfo', data );
  }

  SingleTrafficData( data ) {
    return this.authHttp.post( environment.baseUrl + 'TrafficData/SingleTrafficData', data );
  }

  SingleTrackTrafficData( TrackId ) {
    const data = { TrackId: TrackId };
    return this.authHttp.post( environment.baseUrl + 'TrafficData/SingleTrackTrafficData', data );
  }


  // 获取历史行程轨迹
  TrackTrajectory( TrackId ) {
    const data = { TrackId: TrackId };
    return this.authHttp.post( environment.baseUrl + 'TrackInfo/TrackTrajectory', data );
  }

  // 行车数据列表导出
  AllTrafficDataExportExcel(data){
    return this.authHttp.download( environment.baseUrl + 'TrafficData/AllTrafficDataExportExcel', data );
  }

  // 行车数据详情导出
  SingleVehicleTrackInfoExportExcle(data){
    return this.authHttp.download( environment.baseUrl + 'TrackInfo/SingleVehicleTrackInfoExportExcle', data );
  }


}
