import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DriverManageService {

  constructor( private authHttp: AuthService ) { }


  // 添加驾驶员
  AddDriver( data ) {
    return this.authHttp.post( environment.baseUrl + 'Driver/AddDriver', data );
  }

  // 更新驾驶员信息
  UpdateDriver( data ) {
    return this.authHttp.post( environment.baseUrl + 'Driver/UpdateDriver', data );
  }

  // 获取单个驾驶员信息
  GetSingleDriver( data ) {
    return this.authHttp.post( environment.baseUrl + 'Driver/GetSingleDriver', data );
  }

  // 删除驾驶员
  DeleteDriver( data ) {
    return this.authHttp.post( environment.baseUrl + 'Driver/DeleteDriver', data );
  }

  // 驾驶员分页数据
  GetDriverPageList( data ) {
    return this.authHttp.post( environment.baseUrl + 'Driver/GetDriverPageList', data );
  }

  // 获取未绑定的车辆
  GetUnbindPageVehicles( data ) {
    return this.authHttp.post( environment.baseUrl + 'Driver/GetUnbindPageVehicles', data );
  }

  ImportDriverExcel( data ) {
    return this.authHttp.upload( environment.baseUrl + 'Driver/DriverExcel', data );
  }

  // 驾驶员导出
  DriverExportExcel(data){
    return this.authHttp.download(environment.baseUrl + 'Driver/DriverExportExcel', data);
  }
}
