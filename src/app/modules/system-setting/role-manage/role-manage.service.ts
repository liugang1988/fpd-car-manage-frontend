import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class RoleManageService {

  constructor( private authHttp: AuthService ) { }

  // 用户列表数据(分页)
  GetPageRoleList( data ) {
    return this.authHttp.post( environment.baseUrl + 'Role/GetPageRoleList', data );
  }


  // GetSingleRole
  GetSingleRole( data ) {
    return this.authHttp.post( environment.baseUrl + 'Role/GetSingleRole', data );
  }

  // 新增角色
  AddRole( data ) {
    return this.authHttp.post( environment.baseUrl + 'Role/AddRole', data );
  }


  // 更新角色
  UpdateRole( data ) {
    return this.authHttp.post( environment.baseUrl + 'Role/UpdateRole', data );
  }

  // 删除角色
  DeleteRole( data ) {
    return this.authHttp.post( environment.baseUrl + 'Role/DeleteRole', data );
  }

  // 根据角色获取该角色下所有菜单
  GetAllMenuTreeByRoleId( data ) {
    return this.authHttp.post( environment.baseUrl + 'Permission/GetAllMenuTreeByRoleId', data );
  }

  // 分配菜单
  AllotMenuIdToRole( data ) {
    return this.authHttp.post( environment.baseUrl + 'Role/AllotMenuIdToRole', data );
  }
}
