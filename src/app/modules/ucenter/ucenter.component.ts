import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component( {
  selector: 'app-ucenter',
  templateUrl: './ucenter.component.html',
  styleUrls: [ './ucenter.component.scss' ],
})
export class UcenterComponent implements OnInit, AfterContentInit {
  currentUrl: string;
  tabs: Array<any>;
  constructor( private router: Router ) { }

  ngOnInit() {
    // 设置Tabs数组
    this.tabs = [ {
      name: '个人中心',
      link: '/page/ucenter/personal-center',
      icon: 'fpd-ordinarylogin1'
    }, {
      name: '系统消息',
      link: '/page/ucenter/system-message',
      icon: 'fpd-task'
    }];
  }

  ngAfterContentInit() {
    // 获取当前URL
    this.router.events.subscribe(( evt: { url?: string, urlAfterRedirects?: string }) => {
      this.currentUrl = evt.urlAfterRedirects;
    });
  }

}
