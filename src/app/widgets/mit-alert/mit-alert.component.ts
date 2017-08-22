import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, trigger, state, style, transition, animate } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeIn } from '../../animation/fadeIn';

@Component( {
  selector: 'app-mit-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mit-alert.component.html',
  styleUrls: [ './mit-alert.component.scss' ],
  animations: [fadeIn]
})
export class MitAlertComponent implements OnInit {

  @Input() title: string;  // 弹窗标题

  @Input() saveName: string;  // 保存操作名称

  @Input() closeName: string;  // 取消操作名称

  @Input() disabled = false;

  @Output() close = new EventEmitter();  // 关闭动作
  @Output() submit = new EventEmitter();  // 保存或确认动作




  constructor() { }

  ngOnInit() {
  }

  submitHandler() {
    this.submit.emit( null );
  }


  // 关闭事件
  closeHandler() {
    this.close.emit( null );
  }

}
