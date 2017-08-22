import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


// interface
import { Menu } from './menu.interface';

@Injectable()
export class MenuManageService {

  constructor(private authHttp: AuthService) { }



  // 获取菜单列表
  GetAllMenuTree() {
    return this.authHttp.get(environment.baseUrl + 'Permission/GetAllMenuTree');
  }


  // 新增菜单
  addMeun(from: Menu) {
    return this.authHttp.post(environment.baseUrl + 'Permission/AddMenu', from);
  }

  // 更新菜单
  updateMenu(from: Menu) {
    return this.authHttp.post(environment.baseUrl + 'Permission/UpdateMenu', from);
  }


  // 删除菜单
  deletMenu(from: Menu) {
    return this.authHttp.post(environment.baseUrl + 'Permission/DeleteMenu', from);
  }





}
