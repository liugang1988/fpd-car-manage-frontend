import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn } from '../../../../../animation/fadeIn';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  animations: [fadeIn]
})
export class ModifyComponent implements OnInit {

  @Input() item: any;
  @Output() dispose = new EventEmitter();  // 用于向父级发送弹窗关闭事件
  public status: any;
  public Remark: any;
  constructor() { }

  ngOnInit() {
  }

  saveHandler(e) {
    const data = {
      ID: e.ID,
      Status: this.status,
      Remark: this.Remark
    }
    this.dispose.emit(data);
  }


  closeHandler(e) {
    this.dispose.emit(null);
  }

}
