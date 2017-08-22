import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


// interface
import { DepartmentManage } from './department-manage.interface';

@Injectable()
export class DepartmentManageService {

  constructor(private authHttp: AuthService) { }

  // 获取部门树
  GetAllDeptTree() {
    return this.authHttp.post(environment.baseUrl + 'OrganizationDept/GetAllDeptTree', {});
  };


  // 添加部门
  AddOrganizationDept(data) {
    return this.authHttp.post(environment.baseUrl + 'OrganizationDept/AddOrganizationDept', data);
  };

  // 获取单个组织架构(部门)信息
  GetSingleOrganizationDept(ID) {
    const data = { ID: ID };
    return this.authHttp.post(environment.baseUrl + 'OrganizationDept/GetSingleOrganizationDept', data);
  };


  // 更新组织架构(部门)
  UpdateOrganizationDept(data) {
    return this.authHttp.post(environment.baseUrl + 'OrganizationDept/UpdateOrganizationDept', data);
  };


  // 删除部门
  DeleteOrganizationDept(data) {
    return this.authHttp.post(environment.baseUrl + 'OrganizationDept/DeleteOrganizationDept', data);
  }

}
