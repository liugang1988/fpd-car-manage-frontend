/*
rbac => role base access control
该组件用于控制页面级权限,可通过路由调用该服务

*/


import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
@Injectable()
export class RbacService implements CanActivate {


  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    // 判断是否已经登陆并验证token是否在有效期内,且是否有访问该页面的权限
    if (this.isAuthenticated() && this.isExpiresed()) {

      // 验证是否有权限访问该页面
      // if ( environment.production ) {
      //   this.isMenuAuthority( route );
      // };

      return true;
    }



    this.router.navigate(['/account/login']);
    return false;
  }


  isMenuAuthority(route) {
    // 获取用户MENU
    const menu = JSON.parse(window.localStorage.getItem(environment.local_storage_account)).UserRights.MenuRights.SubLinks;

    // 获取URL片段
    let urlSegments: UrlSegment[] = [];
    route.pathFromRoot.forEach(routerState => {
      urlSegments = urlSegments.concat(routerState.url);
    });

    // 拼接片段
    const url = urlSegments.map(urlSegment => {
      return urlSegment.path;
    }).join('/');

  }


  isExpiresed() {
    const d = new Date();
    if (window.localStorage.getItem(environment.local_storage_account)) {
      const expires = new Date(JSON.parse(window.localStorage.getItem(environment.local_storage_account)).CurUserInfo.Expires * 1000);
      // console.log( '当前时间: ' +  d);
      // console.log( '过期时间: '  + expires);
      if (d > expires) {
        return false;
      };
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated() {
    const account = JSON.parse(window.localStorage.getItem(environment.local_storage_account));
    if (account && account.Token) {
      return true;
    }
    return false;
  }

  getUserID() {
    const account = JSON.parse(window.localStorage.getItem(environment.local_storage_account));
    return account.CurUserInfo.UserId;
  }



  forEachMenu(menu, url) {
    console.log(menu, url)
    let auth = false;
    // 遍历MENU
    menu.forEach((item) => {
      if (item.Url.indexOf(url) > -1 && item.HasRight) {
        auth = true;
      }

      if (item.SubLinks) {
        this.forEachMenu(item.SubLinks, url);
      }
    });

    return auth;

  }
}
