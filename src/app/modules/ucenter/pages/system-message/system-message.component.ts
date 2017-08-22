import { environment } from '../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { SystemMessageService } from './system-message.service';
@Component( {
  selector: 'app-message-notify',
  templateUrl: './system-message.component.html',
  styleUrls: [ './system-message.component.scss' ]
})
export class SystemMessageComponent implements OnInit {

  rows = [
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' },
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' },
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' },
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' },
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' },
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' },
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' },
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' },
    { state: 'uncheck', content: '系统于【2106-12-10 23:30:00】进行系统升级维护，造成您的不便，敬请谅解', date: '2016-12-10 12:00:01', category: '站内消息' }
  ];


  // 表头设置  字段名 + 中文名 按顺序至上往下从左到右
  columns = [
    { field: 'state', name: '状态' },
    { field: 'content', name: '内容' },
    { field: 'date', name: '时间' },
    { field: 'category', name: '类型' }
  ];

  constructor() { }

  ngOnInit() {
  }

  checkEvent( e ) {
    console.log( e );
  }

}
