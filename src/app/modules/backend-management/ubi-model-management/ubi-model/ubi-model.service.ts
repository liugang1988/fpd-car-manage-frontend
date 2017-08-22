import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class UbiModelService {

  constructor(
    private authHttp: AuthService
  ) { }

  // ubi模型管理列表
  GetUBIModelList(data) {
    return this.authHttp.post( environment.baseUrl + 'UBIModel/UBIModelList', data);
  }

  // 新建模型
  AddModel(data) {
    return this.authHttp.post( environment.baseUrl + 'UBIModel/AddModel', data );
  }

  // 获取动静态保险项目占比
  AllInsuranceItemList() {
    return this.authHttp.get( environment.baseUrl + 'UBICommonInsurance/AllInsuranceItemList');
  }

  // 驾驶行为枚举
  DrivingActionEnum(){
    return this.authHttp.get( environment.baseUrl + 'SysBasic/DrivingActionEnum');
  }

  // 超速行驶枚举
  SpeedEnum(){
    return this.authHttp.get( environment.baseUrl + 'SysBasic/SpeedEnum');
  }

  // 获取出险次数
  NearYearCompensateEnum(){
    return this.authHttp.get( environment.baseUrl + 'SysBasic/NearYearCompensateEnum');
  }

  // 删除ubi模型
  DeleteUBIModel(data) {
    return this.authHttp.post( environment.baseUrl + 'UBIModel/DeleteModel', data );
  }

  // 更新ubi模型
  UpdateModel(data) {
    return this.authHttp.post( environment.baseUrl + 'UBIModel/UpdateModel', data );
  }

  // 更新启用状态（列表页）
  UpdateModelStatus(data) {
    return this.authHttp.post( environment.baseUrl + 'UBIModel/EnableModel', data );
  }

  // 模型详细信息
  GetModelDetail(data) {
    return this.authHttp.post( environment.baseUrl + 'UBIModel/GetModelDetail', data );
  }

  // 新建模型的模型名唯一校验
  CheckModelNameExisted(data){
    return this.authHttp.post( environment.baseUrl + 'UBIModel/ModelNameExisted', data );
  }
}
