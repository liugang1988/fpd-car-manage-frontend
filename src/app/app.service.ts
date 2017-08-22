import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
@Injectable()
export class AppService {

  constructor( private authService: AuthService ) { }

  GetUserAllRights( data ) {
    return this.authService.post( environment.baseUrl + 'Account/GetUserAllRights', data );
  }

}
