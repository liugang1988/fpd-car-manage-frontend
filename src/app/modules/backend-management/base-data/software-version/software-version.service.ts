import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth.service';


@Injectable()
export class SoftwareVersionService {

  constructor( private authHttp: AuthService ) { }

  // 	软件版本列表
  GetFirmwareList( data ) {
    return this.authHttp.post( environment.baseUrl + 'Firmware/GetPageFrimwarmList', data );
  }

  // 获取单条版本信息
  GetSingleFirmware( data ) {
    return this.authHttp.post( environment.baseUrl + 'Firmware/GetSingleFirmware', data );
  }

  // 	新增软件版本
  AddFirmware( data ) {
    return this.authHttp.post( environment.baseUrl + 'Firmware/AddFirmware', data );
  }

  // 	更新软件版本
  UpdateFirmware( data ) {
    return this.authHttp.post( environment.baseUrl + 'Firmware/UpdateFirmware', data );
  }


  // 	删除软件版本
  DeleteFirmware( data ) {
    return this.authHttp.post( environment.baseUrl + 'Firmware/DeleteFirmware', data );
  }



}
