import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// 服务
import { NameOfCarService } from '../name-of-car.service';
import { EventsService } from '../../../../../services/events-service.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() item: any;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件
  constructor(
    private eventsService: EventsService,
    private nameOfCarService: NameOfCarService
  ) { }

  ngOnInit() {
  }


  saveHandler(e) {
    this.close.emit(e);
  }


  closeHandler(e) {
    this.close.emit(null);
  }

}
