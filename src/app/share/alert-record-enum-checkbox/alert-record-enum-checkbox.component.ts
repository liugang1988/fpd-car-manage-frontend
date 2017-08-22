import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertRecordEnumCheckboxService } from './alert-record-enum-checkbox.service';
import { EventsService } from '../../services/events-service.service';
@Component({
  selector: 'app-alert-record-enum-checkbox',
  templateUrl: './alert-record-enum-checkbox.component.html',
  styleUrls: ['./alert-record-enum-checkbox.component.scss']
})
export class AlertRecordEnumCheckboxComponent implements OnInit, OnDestroy {
  public getRenderList: any;
  @Output() result = new EventEmitter();

  public list = [];

  constructor(
    private alertRecordEnumCheckboxService: AlertRecordEnumCheckboxService,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEnum();
  }

  // 获取枚举
  getEnum() {
    this.getRenderList = this.alertRecordEnumCheckboxService.AlertRecordEnum().subscribe(
      (res) => {
        this.list = res.Data;
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

  check(list) {
    const checkArr = [];
    list.forEach((item) => {
      if (item.checked) {
        checkArr.push(item.ID);
      }
    });
    this.result.emit(checkArr.join(','));
  }

  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
  }

}
