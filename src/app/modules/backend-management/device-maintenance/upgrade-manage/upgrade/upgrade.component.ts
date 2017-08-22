import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeManageService } from '../upgrade-manage.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  @Input() item: any;

  @Output() close = new EventEmitter();

  public BinUpdateType = 9; // 升级类型

  public disabled = false;
  public FirewareID: any;
  constructor(
    private upgradeManageService: UpgradeManageService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
  }


  saveHandler(DeviceID, BinUpdateType, FirewareID) {
    this.disabled = true;
    const data = {
      DeviceID: DeviceID,
      FirewareID: FirewareID,
      UpdateType: BinUpdateType
    };
    this.upgradeManageService.Update(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.close.emit(data);
      } else {
        this.close.emit(null);
      }
    }, (err) => {
      this.close.emit(null);
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }


  // 关闭
  closeHandler(e) {
    this.close.emit(null);
  }
}
