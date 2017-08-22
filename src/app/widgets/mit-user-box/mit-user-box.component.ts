import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

import { UserBoxService } from './user-box.service';
import { fadeIn } from '../../animation/fadeIn';
@Component({
  selector: 'app-mit-user-box',
  templateUrl: './mit-user-box.component.html',
  styleUrls: ['./mit-user-box.component.scss'],
  animations: [fadeIn]
})
export class MitUserBoxComponent implements OnInit {

  public isCollapsed = true;
  public isExpand = false;  // 展开待办事项列表


  public username: string = this.getUserName(); // 用户名
  constructor(private _eref: ElementRef, private router: Router, private userBoxService: UserBoxService) { }

  ngOnInit() {
  }


  // 监听全局点击事件 *用于隐藏下拉菜单
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
    }
  }



  // 获取用户名或者邮箱
  getUserName() {
    if (localStorage.getItem(environment.local_storage_account)) {
      const temp = JSON.parse(localStorage.getItem(environment.local_storage_account)).CurUserInfo;
      return temp.AccountName;
    } else {
      return 'anonymous';
    }

  }

  // 注销
  signOut() {
    this.userBoxService.LogOut().subscribe((res) => {
      localStorage.removeItem(environment.local_storage_account);
      this.router.navigate(['/account/login']);
    },(err) => {
      this.router.navigate(['/account/login']);
    });
  }

}
