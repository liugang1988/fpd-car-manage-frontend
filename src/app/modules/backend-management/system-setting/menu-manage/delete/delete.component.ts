import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuManageService } from '../menu-manage.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() selectedMenu: any;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件

  constructor(private menuManageService: MenuManageService) { }

  ngOnInit() {
  }

  saveHandler(e) {
    const _objcet = { ID: e.ID };
    this.menuManageService.deletMenu(_objcet).subscribe((res) => {
      this.close.emit(_.extend(e, res));
    }, (err) => {
      this.close.emit(_.extend(e, err));
    });
  }


  closeHandler() {
    this.close.emit(null);
  }

}
