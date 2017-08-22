import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-mit-tabs',
  templateUrl: './mit-tabs.component.html',
  styleUrls: ['./mit-tabs.component.scss']
})
export class MitTabsComponent implements OnInit {

  @Input() tabs: Array<any>; // tab标题数组

  @Input() currentUrl: String; // 当前URL

  @Input() styles: String; // 给tabs添加额外的控制样式类




  constructor() { }

  ngOnInit() {
  }

}
