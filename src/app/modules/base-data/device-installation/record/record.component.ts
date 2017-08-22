import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DeviceInstallationService } from '../device-installation.service';
import { EventsService } from '../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent extends MitDataTableBase implements OnInit {

  @Output() close = new EventEmitter();
  @Input() item: any;
  public _getList: any;

  constructor(private deviceInstallationService: DeviceInstallationService, private eventsService: EventsService, private router: Router, private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }
  ngOnInit() {
  }


  getList(pageIndex?) {
    this.query.SearchID = this.item.ID;
    this._getList = this.deviceInstallationService.InstallRecordByVehicle(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ SearchID: this.item.ID, pageNum: pageIndex ? pageIndex : this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
      },
      (err) => {
        
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
      }
    );
  }

  saveHandler(e) {
    this.close.emit(null);
  }


  closeHandler(e) {
    this.close.emit(null);
  }

  // 销毁
  ngOnDestroy() {
    if (this._getList) {
      this._getList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }
}
