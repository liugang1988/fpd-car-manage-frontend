import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class DictionarySelectService {

  constructor(private authHttp: AuthService) { }

  // 获取单个传参字典
  GetSingleDictionaryList(id) {
    const data = { Category: id };
    return this.authHttp.post(environment.baseUrl + 'SysBasic/DictionaryList', data);
  }

  // 根据字典类型字符串获取字典内容(参数：1,2,3,4,5)
  GetArrayDictionaryList(array) {
    const data = { Categorys: array.join() };
    return this.authHttp.post(environment.baseUrl + 'SysBasic/ArrayDictionaryList', data);
  }



}
