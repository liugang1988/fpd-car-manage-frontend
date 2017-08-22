import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleInstallService } from '../vehicle-install.service';
import { EventsService } from '../../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent extends MitDataTableBase implements OnInit, OnDestroy {

  @Output() close = new EventEmitter();
  @Input() item: any;
  public getRenderList: any;
  constructor(
    private vehicleInstallService: VehicleInstallService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }
  ngOnInit() {
  }


  getList(pageIndex?) {
    this.query.SearchID = this.item.ID;
    this.getRenderList = this.vehicleInstallService.InstallRecordByVehicle(this.query).subscribe(
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

  saveHandler() {
    this.close.emit(null);
  }


  closeHandler(e) {
    this.close.emit(null);
  }

  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    this.list = [];
    this.rows = [];
  }

}
