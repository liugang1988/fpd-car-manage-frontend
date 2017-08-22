import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleManageService } from '../role-manage.service';
import { EventsService } from '../../../../services/events-service.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input() item: any;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件

  constructor(
    private roleManageService: RoleManageService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
  }


  // 删除请求
  deleteRole(data) {
    this.roleManageService.DeleteRole(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.close.emit(data);
      } else {
        this.close.emit(null);
      }
    });
  }

  saveHandler(e) {
    this.deleteRole({ 'ID': parseInt(e.ID, 10) });
  }


  closeHandler(e) {
    this.close.emit(null);
  }


}
