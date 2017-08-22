import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input() item: any;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件

  constructor() { }

  ngOnInit() {
  }

  saveHandler(e) {
    this.close.emit(e);
  }


  closeHandler(e) {
    this.close.emit(null);
  }


}
