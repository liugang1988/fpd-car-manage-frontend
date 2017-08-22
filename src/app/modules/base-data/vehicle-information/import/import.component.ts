import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VehicleInformationService } from '../vehicle-information.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {


  @Input() item: any;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件

  public file: FormData;
  public message: string;

  public showLoading = false;

  public DownExcel: string;

  constructor(private VehicleInformationService: VehicleInformationService, private eventsService: EventsService) { }

  ngOnInit() {
    this.DownExcel = 'http://oo140vnvi.bkt.clouddn.com/%E8%BD%A6%E8%BE%86%E6%A1%A3%E6%A1%88%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';
  }

  // 接受文件
  uploadHandle(e) {
    this.file = e;
  }
  // 确认
  saveHandler(e) {
    this.showLoading = true;
    this.VehicleInformationService.ImportVehicle(this.file).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.showLoading = false;
      if (res.State) {
        this.close.emit(null);
      } else {
        this.message = res.Message;
      }
    }, (err) => {
      this.showLoading = false;
      this.message = err.Message;
    });
  }

  // 关闭
  closeHandler(e) {
    this.close.emit(null);
  }
}
