import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class RoleSelectService {

  constructor( private authHttp: AuthService ) { }
  GetRoleListByOID( OID ) {
    let data = {};
    if ( OID ) {
      data = { OID: OID };
    }
    return this.authHttp.post( environment.baseUrl + 'Role/GetRoleListByOID', data );
  }


}
