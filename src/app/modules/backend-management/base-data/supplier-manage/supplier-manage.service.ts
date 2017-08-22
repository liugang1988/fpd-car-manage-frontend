import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';



@Injectable()
export class SupplierManageService {

  constructor(private authHttp: AuthService) { }

  // 获取供应商列表
  GetSupplier(data) {
    return this.authHttp.post(environment.baseUrl + 'Supplier/SupplierList', data);
  }

  // 获取单个供应商信息
  GetSingleSupplier(data) {
    return this.authHttp.post(environment.baseUrl + 'Supplier/Supplier', data);
  }

  // 编辑供应商信息
  UpdateSupplier(data) {
    return this.authHttp.post(environment.baseUrl + 'Supplier/EditSupplier', data);
  }

  // 添加供应商信息
  AddSupplier(data) {
    return this.authHttp.post(environment.baseUrl + 'Supplier/AddSupplier', data);
  }


  // 删除供应商
  DeletaSupplier(data) {
    return this.authHttp.post(environment.baseUrl + 'Supplier/DelSupplier', data);
  }
}


