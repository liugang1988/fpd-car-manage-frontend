import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileAlarmService } from './mobile-alarm.service';
import { EventsService } from '../../services/events-service.service';
import { fadeIn } from '../../animation/fadeIn';
@Component({
  selector: 'app-mobile-alarm',
  templateUrl: './mobile-alarm.component.html',
  styleUrls: ['./mobile-alarm.component.scss'],
  animations: [fadeIn]
})
export class MobileAlarmComponent implements OnInit, OnDestroy {
  public queryParamStr: string;
  public getToken: string;
  public getAID: string;

  public cardInfo: any;
  public successHidden = true;
  public ProcessingStatus: number;

  public getRenderList: any;
  public _GetParam_: any;
  constructor(
    public mobileAlarmService: MobileAlarmService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this._GetParam_ = this.activatedRoute.queryParams.subscribe(
      (queryParams: { token: string }) => {
        if (queryParams && queryParams.token) {
          this.queryParamStr = queryParams.token;
          const underIndex = this.queryParamStr.indexOf('_');
          this.getToken = this.queryParamStr.substr(0, underIndex);
          this.getAID = this.queryParamStr.substr(underIndex + 1, this.queryParamStr.length);
          this.GetAlertBasicInfo({ 'AID': parseInt(this.getAID, 10) }, this.getToken);
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
  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    if (this._GetParam_) {
      this._GetParam_.unsubscribe();
    }
  }

  GetAlertBasicInfo(data, token) {
    this.getRenderList = this.mobileAlarmService.GetAlertBasicInfo(data, token).subscribe(
      (res) => {
        if (res.State) {
          this.cardInfo = res.Data;
          if (res.Data.ProcessingStatus >= 2) {
            this.successHidden = false;
          }
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


  // 提交
  submit(ProcessingStatus, Memo) {
    const combineParam = {
      AID: this.getAID,
      Memo: Memo,
      ProcessingStatus: ProcessingStatus
    };
    this.mobileAlarmService.ProcessAlarmBySelf(combineParam, this.getToken).subscribe(
      (res) => {
        this.GetAlertBasicInfo({ 'AID': parseInt(this.getAID, 10) }, this.getToken);
        this.successHidden = false;
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      },
      (err) => {
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);

      }
    );
  }
}
