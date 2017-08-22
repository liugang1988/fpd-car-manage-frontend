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

@Component({
  selector: 'app-scan-detail',
  templateUrl: './scan-detail.component.html',
  styleUrls: ['./scan-detail.component.scss'],
  animations: [fadeIn, bounceIn]
})

export class ScanDetailComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public getId: any;
  public id: number;
  public checkRenderlist: any;
  public carinfo: any;
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
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { checkid: string }) => {
      if (params && params.checkid) {
        this.id = parseInt(params.checkid, 10);
        this.getCarInfo({ MonitorLogId: this.id });
      }
    });
  }


  getCarInfo(data) {
    this._getCarInfo_ = this.vehicleConditionMonitorService.GetCarMonitorLogDetailByLogID(data).subscribe(
      (res) => {
        if (res.State) {
          this.carinfo = res.Data;
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


  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if (this.getId) {
      this.getId.unsubscribe();
    }
  }

}
