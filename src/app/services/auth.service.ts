import { Injectable } from '@angular/core';  // 依赖注入模块
import { Http, Headers, Response, RequestOptions, Jsonp , URLSearchParams } from '@angular/http'; // http模块
import { Router } from '@angular/router';
// 异步数据流控制
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  public headers: any; // http 头部
  public options: any; // 参数
  constructor(private http: Http, private router: Router, private jsonp: Jsonp) { }

  get(url?: string) {
    this.getToken();
    return this.http.get(url, this.options).map(res => res.json()).catch(this.handleError);
  }

  post(url?: string, form?: any, file?: boolean) {
    this.getToken();
    return this.http.post(url, form, this.options).map(res => res.json()).catch(this.handleError);
  }

  delete(url?: string, form?: any) {
    this.getToken();
    return this.http.delete(url, this.options).map(res => res.json()).catch(this.handleError);
  }

  upload(url?: string, form?: any) {
    this.specialHeader();
    return this.http.post(url, form, this.options).map(res => res.json()).catch(this.handleError);
  }

  download(url?:string, form?:any){
    this.downloadHeader();
     return this.http.post(url, form, this.options).map(res => res.json()).catch(this.handleError);
  }

  jsonpGet(url, term?) {
    const params = new URLSearchParams();
    params.set('search', term); 
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set("callback", "JSONP_CALLBACK");
    return this.jsonp.get(url, {search: params}).map(result=>result.json());
  }

  downloadHeader(){
    if (localStorage.getItem(environment.local_storage_account)) {
      this.headers = new Headers({'token': JSON.parse(localStorage.getItem(environment.local_storage_account)).Token });
      this.options = new RequestOptions({ headers: this.headers, responseType: 3 });
    }
  }

  specialHeader() {
    if (localStorage.getItem(environment.local_storage_account)) {
      this.headers = new Headers({ 'token': JSON.parse(localStorage.getItem(environment.local_storage_account)).Token });
      this.options = new RequestOptions({ headers: this.headers });
    }
  }



  // 获取TOKEN
  getToken() {
    if (localStorage.getItem(environment.local_storage_account)) {
      this.headers = new Headers({ 'Content-Type': ' application/json', 'token': JSON.parse(localStorage.getItem(environment.local_storage_account)).Token });
      this.options = new RequestOptions({ headers: this.headers });
    }
  }

  // 错误事件
  private handleError(error: Response) {
    return Observable.throw(error.json() || 'Server Error');
  }

}
