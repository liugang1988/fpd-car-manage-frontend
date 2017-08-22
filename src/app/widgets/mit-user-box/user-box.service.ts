import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserBoxService {

  constructor( private authHttp: AuthService ) { }

  LogOut() {
    return this.authHttp.get( environment.baseUrl + 'Account/Logout' );
  }

}
