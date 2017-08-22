import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { VehicleConditionMonitorService } from '../vehicle-condition-monitor.service';
import { EventsService } from '../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';
import { flyIn } from '../../../../animation/flyIn';


@Component({
  selector: 'app-remote-check',
  templateUrl: './remote-check.component.html',
  styleUrls: ['./remote-check.component.scss'],
  animations: [fadeIn, bounceIn, flyIn]
})

export class RemoteCheckComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public getId: any;
  public did: number;
  public vid: number;
  public checkRenderlist: any;
  public carinfo: any;
  public _checkRenderlist_: any;
  public _getCarInfo_: any;
  constructor(
    private vehicleConditionMonitorService: VehicleConditionMonitorService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.checkRenderlist = undefined;
    this.carinfo = undefined;
    this.checkAction();

  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { did: any, vid: any }) => {
      if (params && params.did && params.vid) {
        this.did = parseInt(params.did, 10);
        this.vid = parseInt(params.vid, 10);
        this.getCarInfo({ Vid: this.vid });
        this.GetOBDEngineIndex({ 'DeviceID': this.did });
      }
    });
  }

  // 获取所有数据
  GetOBDEngineIndex(data) {
    this._checkRenderlist_ = this.vehicleConditionMonitorService.GetOBDEngineIndex(data).subscribe(
      (res) => {
        if (res.State) {
          this.checkRenderlist = res.Data;
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

  getCarInfo(data) {
    this._getCarInfo_ = this.vehicleConditionMonitorService.VehicleDetail(data).subscribe(
      res => {
        if (res.State) {
          this.carinfo = res.Data;
        }
      },
      err => {
        
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

  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if (this.getId) {
      this.getId.unsubscribe();
    }
    if (this._getCarInfo_) {
      this._getCarInfo_.unsubscribe();
    }
  }

}
