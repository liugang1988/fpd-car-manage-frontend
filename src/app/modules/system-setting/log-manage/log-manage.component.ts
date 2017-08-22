import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-manage',
  templateUrl: './log-manage.component.html',
  styleUrls: ['./log-manage.component.scss']
})
export class LogManageComponent implements OnInit {
  currentUrl: string;
  tabs: Array<any>;

  constructor(private router: Router) { }

  ngOnInit() {
    // 设置Tabs数组
    this.tabs = [{
      name: '登录日志',
      link: '/page/system-setting/log-manage/login-log'
    }
    // , {
    //   name: '操作日志',
    //   link: '/page/system-setting/log-manage/operate-log'
    // }
    ];

    // 获取当前URL
    this.router.events.subscribe((evt: { url?: string, urlAfterRedirects?: string }) => {
      this.currentUrl = evt.urlAfterRedirects;
    });
  }

}
