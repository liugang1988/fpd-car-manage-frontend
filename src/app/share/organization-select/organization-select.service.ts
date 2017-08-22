import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class OrganizationSelectService {

  constructor( private authHttp: AuthService ) { }

  // 组织机构列表(不分页)
  OrganizationListinfo() {
    return this.authHttp.get( environment.baseUrl + 'Organization/OrganizationListinfo');
  }
}

