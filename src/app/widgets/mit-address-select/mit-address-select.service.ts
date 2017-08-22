import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MitAddressSelectService {

  constructor( private http: Http ) { }

  getAddress() {
    return this.http.request( 'assets/data/china_address.json' ).map( res => res.json() );
  }

}
