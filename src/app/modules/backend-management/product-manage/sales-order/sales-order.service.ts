import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class SalesOrderService {

  constructor(private authHttp: AuthService) { }

  // 获取客户列表
  GetOrganizationList(){
    return this.authHttp.get(environment.baseUrl + 'SalesOrder/GetOrganizationList');
  }

  // 获取销售订单列表
  GetSalesOrderList(data) {
    return this.authHttp.post(environment.baseUrl + 'SalesOrder/SalesOrderList', data);
  }

  // 添加销售订单
  AddSalesOrder(data) {
    return this.authHttp.post(environment.baseUrl + 'SalesOrder/AddSalesOrder', data);
  }

  // 修改销售订单
  UpdateSalesOrder(data) {
    return this.authHttp.post(environment.baseUrl + 'SalesOrder/UpdateSalesOrder', data);
  }

  // 销售订单详情
  SalesOrderDetail(data) {
    return this.authHttp.post(environment.baseUrl + 'SalesOrder/SalesOrderDetail', data);
  }
}
