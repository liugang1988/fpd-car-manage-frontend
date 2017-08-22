import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class DeviceInService {

  constructor(private authHttp: AuthService) { }
  // 设备入库列表
  GetStorageList(data) {
    return this.authHttp.post(environment.baseUrl + 'StorageList/StorageList', data);
  }

  // 设备入库Excel录入
  AddStorageExcel(data, OrderCode, SupplierId, DeviceModelId) {
    const url = `StorageList/DeviceExcel?OrderCode=${OrderCode}&SupplierId=${SupplierId}&DeviceModelId=${DeviceModelId}`;
    return this.authHttp.upload(environment.baseUrl + url, data);
  }

  // SIM入库Excel
  AddSimExcel(data, OrderCode, SupplierId, DeviceModelId) {
    const url = `SIM/AddSIM?OrderCode=${OrderCode}&SupplierId=${SupplierId}&DeviceModelId=${DeviceModelId}`;
    return this.authHttp.upload(environment.baseUrl + url, data);
  }



  // 设备入库明细（硬件）
  DetailStorageHW(data) {
    return this.authHttp.post(environment.baseUrl + 'StorageList/StorageListInfo', data);
  }

  // 设备入库明细（SIM卡）
  DetailStorageSW(data) {
    return this.authHttp.post(environment.baseUrl + 'StorageList/StorageSIMListInfo', data);
  }

  // 设备入库明细（硬件）列表
  HWStorageList(data) {
    return this.authHttp.post(environment.baseUrl + 'StorageList/StorageListBase', data);
  }

  // 设备入库明细（SIM）列表
  SWStorageList(data) {
    return this.authHttp.post(environment.baseUrl + 'StorageList/StorageSIMListBase', data);
  }

  // 获取采购订单号列表
  PurchaseOrderNoList(data) {
    return this.authHttp.post(environment.baseUrl + 'Purchase/PurchaseOrderNoList', data);
  }

  // 根据采购订单号获取相应订单详情 供设备入库导入详情使用
  GetStorageInfo(data) {
    return this.authHttp.post(environment.baseUrl + 'Purchase/GetStorageInfo', data);
  }
}
