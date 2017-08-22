import { Component, OnInit } from '@angular/core';
import { Output, Input, EventEmitter } from '@angular/core';

@Component( {
  selector: 'app-mit-header',
  templateUrl: './mit-header.component.html',
  styleUrls: [ './mit-header.component.scss' ]
})
export class MitHeaderComponent implements OnInit {

  @Output() toggleEvt: EventEmitter<any> = new EventEmitter();  // 侧边栏点击事件

  @Input() isExpand = true; // 输入扩展状态

  constructor() { }

  ngOnInit() {
  }

  toggleNav() {
    this.isExpand = !this.isExpand;
    this.toggleEvt.emit( this.isExpand );
  }

}
