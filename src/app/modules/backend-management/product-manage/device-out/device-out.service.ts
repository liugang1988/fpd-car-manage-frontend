import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class DeviceOutService {

  constructor(private authHttp: AuthService) { }
  // 获取出库单列表
  GetDeviceDelivery(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceDelivery/DeviceDeliveryList', data);
  }

  // 获取订单号列表
  GetSalesOrderNoList(){
    return this.authHttp.get(environment.baseUrl + 'SalesOrder/SalesOrderNoList');
  }

  // 获取订单号对应的出库详情
  GetDeviceDetail(data){
    return this.authHttp.post(environment.baseUrl + 'SalesOrder/GetDeviceDeliveryInfo', data);
  }

  // 出库单Excel录入
  AddDeviceDelivery(data, OrderCode, Address, Receiver, ShippingMethods, LogisticsCompany, LogisticsNumber) {
    const url = `DeviceDelivery/DeviceDeliveryExcel?OrderCode=${OrderCode}&Address=${Address}&Receiver=${Receiver}&ShippingMethods=${ShippingMethods}&LogisticsCompany=${LogisticsCompany}&LogisticsNumber=${LogisticsNumber}`;
    return this.authHttp.upload(environment.baseUrl + url, data);
  }

  // 出库单详情
  DetailDeviceDelivery(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceDelivery/DeviceDeliveryDetail', data);
  }

  // 出库清单
  DeviceDeliveryDetailList(data) {
    return this.authHttp.post(environment.baseUrl + 'DeviceDelivery/DeviceDeliveryDetailList', data);
  }

  // 获取物流公司
  GetLogisticsCompany(data){
    return this.authHttp.post(environment.baseUrl + 'SysBasic/DictionaryList', data);
  }
}
