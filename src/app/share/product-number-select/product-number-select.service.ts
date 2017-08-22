import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductNumberSelectService {

  constructor( private authHttp: AuthService ) { }

  // 根据供应商ID获取设备型号列表
  GetDeviceModelBySupplierId( data ) {
    return this.authHttp.post( environment.baseUrl + 'DeviceModel/GetDeviceModelBySupplierId', data );
  }
}
