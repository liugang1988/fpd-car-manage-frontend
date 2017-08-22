import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../services/events-service.service';

// 服务注入
import { RealTimeService } from './real-time.service';
import { flyIn } from '../../../../animation/flyIn';
@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss'],
  animations: [flyIn]
})
export class RealTimeComponent implements OnInit, OnDestroy {
  public getDid: any; // 设备ID
  public panelInfo: any; // 面板的信息
  public realTimeInfo: any;
  public startTime: any;
  public timeout: any;
  public tips: string;
  public showRealTimeConditionAlert = false;
  public getRenderData: any;
  public showAlert = false;
  public showLoading = true;

  public times: any;
  public isSupport51:any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private realTimeService: RealTimeService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.getRouteDid();
    this.reload();
  }

  // 获取Did
  getRouteDid() {
    this.getDid = this.activatedRoute.parent.parent.parent.params.subscribe((params: { Did: string }) => {
      this.startTime = null;
      this.TrackRealTimeInfo(parseInt(params.Did, 10));
    });
  }

  // 运行30分钟，页面强制刷新一次
  reload() {
    this.times = setTimeout(() => {
      window.location.reload();
    }, 1800000);
  }


  // 获取实况信息
  TrackRealTimeInfo(Did) {
    const data = { Did: Did, StartTime: this.startTime };
    this.getRenderData = this.realTimeService.TrackRealTimeInfo(data).subscribe((res) => {
      this.showLoading = false;
      const gps_data = res.Data;
      // if (!gps_data.GPSPoints || !gps_data.GPSPoints.size && !this.startTime) {
      //   this.tips = '哎呀，没有该车辆的实时数据！';
      // } else {
      //   this.tips = undefined;
      //   this.realTimeInfo = gps_data;
      //   this.getVehicleStatus({VehicleId : this.realTimeInfo.VID})
      // }

      this.realTimeInfo = gps_data;
      this.getVehicleStatus({VehicleId : this.realTimeInfo.VID})

      if (gps_data.GPSPoints && gps_data.GPSPoints.size) {
        this.eventsService.emitMessageEvent('EVENT_CAR_REAL_TIME_TRACK', gps_data);
      }
      if (gps_data.GPSPoints) {
        this.startTime = gps_data.GPSPoints.size ? new Date() : this.startTime;
      }
      this.timeout = setTimeout(() => {
        this.TrackRealTimeInfo(Did);
      }, 10000);
    }, (err) => {
      this.tips = err.Message;

      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    });
  }

  // 获取车辆是否支持51协议
  getVehicleStatus(data) {
    this.realTimeService.GetVehicleSpecificStatus(data).subscribe((res) => {
      this.isSupport51 = res.Data.IsSupport51;
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    })
  }

  RealTimeCondition() {
    this.showRealTimeConditionAlert = true;
  }

  ngOnDestroy() {
    if (this.getRenderData) {
      this.getRenderData.unsubscribe();
    }
    if (this.getDid) {
      this.getDid.unsubscribe();
    }
    clearTimeout(this.timeout);
  }
}
