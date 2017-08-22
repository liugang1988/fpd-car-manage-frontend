import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { EventSetService } from './event-set.service';
import { EventsService } from '../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../animation/fadeIn';

@Component({
  selector: 'app-event-set',
  templateUrl: './event-set.component.html',
  styleUrls: ['./event-set.component.scss'],
  animations: [fadeIn]
})
export class EventSetComponent implements OnInit, OnDestroy {
  public list:any;
  public driveID:any = 'driveID';
  public oprationID:any = 'oprationID';
  public safeID:any = 'safeID';
  public driveData:any;  // 驾驶行为数据
  public oprationData:any; // 运营管控数据
  public safeData:any; // 安全报警数据
  public _getList:any;
  constructor(
    private eventsService: EventsService,
    private eventSetService: EventSetService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAlertSettingList();
  }

  // 获取事件设置分组
  getAlertSettingList(){
    this._getList = this.eventSetService.GetAlertSettingList().subscribe((res)=>{
      this.list = res.Data;
      this.safeData = this.list[0];
      this.oprationData = this.list[1];
      this.driveData = this.list[2];
    }, (err)=>{
      if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    })
  }

  // 更新单个事件修改
  updateSingleAlertSetting(ID, Enabled, IsPush, elem?){
    let enabled = Enabled;
    let isPush = IsPush;
    if(elem){
      isPush = enabled ? isPush : enabled
    }
    const data = {
      ID: ID,
      Enabled: enabled,
      IsPush: isPush
    }
    this.eventSetService.UpdateSingleAlertSetting(data).subscribe((res)=>{
      this.getAlertSettingList();
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
    }, (err)=>{
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    })
  }

  // 更新大类事件修改
  updateOneKindAlertSetting(Kind, Enabled){
    const data = {
      Kind: Kind,
      Enabled: Enabled
    }
    this.eventSetService.UpdateOneKindAlertSetting(data).subscribe((res)=>{
      this.getAlertSettingList();
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
    }, (err)=>{
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    })
  }

  ngOnDestroy() {
    if(this._getList){
      this._getList.unsubscribe();
    }
    this.list = [];
  }

}
