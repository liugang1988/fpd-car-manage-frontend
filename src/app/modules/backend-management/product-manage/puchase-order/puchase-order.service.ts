import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class PuchaseOrderService {

  constructor(private authHttp: AuthService) { }
  // 获取采购单列表
  GetPurchaseList(data) {
    return this.authHttp.post(environment.baseUrl + 'Purchase/PurchaseList', data);
  }

  // 获取添加采购订单
  AddPurchaseList(data) {
    return this.authHttp.post(environment.baseUrl + 'Purchase/AddPurchase', data);
  }

  // 编辑更新采购订单 || 获取单个采购订单信息
  UpdatePurchaseList(data) {
    return this.authHttp.post(environment.baseUrl + 'Purchase/UpdatePurchase', data);
  }

  // 删除采购订单
  DeletaPurchase(data) {
    return this.authHttp.post(environment.baseUrl + 'Purchase/DeletePurchase', data);
  }

  // 采购订单详情
  DetailPurchase(data) {
    return this.authHttp.post(environment.baseUrl + 'Purchase/purchaseinDTO', data);
  }


  // 获取单个采购订单信息
  GetSinglePurchaseWithDetail(data) {
    return this.authHttp.post(environment.baseUrl + 'Purchase/GetSinglePurchaseWithDetail', data);
  }

}
