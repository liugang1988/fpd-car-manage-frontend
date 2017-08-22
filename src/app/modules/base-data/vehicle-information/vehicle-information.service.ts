import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable()
export class VehicleInformationService {

  constructor(private authHttp: AuthService) { }

  // 车辆信息列表
  VehicleList(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/VehicleList', data);
  }

  // 添加车辆档案
  AddVehicle(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/AddVehicle', data);
  }

  // 获取车辆档案详情
  DetailVehicle(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/VehicleDetail', data);
  }

  // 删除车辆
  DeleteVehicle(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/DelVehicle', data);
  }
  // 修改车辆档案信息
  UpdateVehicle(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/UpdateVehicle', data);
  }
  // Excel档导入车辆信息
  ImportVehicle(data) {
    return this.authHttp.upload(environment.baseUrl + 'Vehicle/VehicleExcel', data);
  }

  // 获取单车信息
  GetSingleVehicle(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/GetSingleVehicle', data);
  }

  // 获取字典集合
  DictionaryList(data) {
    return this.authHttp.post(environment.baseUrl + 'SysBasic/ArrayDictionaryList', data);
  }

  // 车辆信息导出
  VehicleExportExcel(data){
    return this.authHttp.download(environment.baseUrl + 'Vehicle/VehicleExportExcel', data);
  }


}
