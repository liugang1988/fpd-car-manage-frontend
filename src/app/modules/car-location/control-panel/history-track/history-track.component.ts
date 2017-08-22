import { Component, OnInit, AfterContentInit, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { HistoryTrackService } from './history-track.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../services/events-service.service';
import { MitBaiduMapComponent } from '../../../../widgets/mit-baidu-map/mit-baidu-map.component';
import { MitBaiduMapService } from '../../../../widgets/mit-baidu-map/services/mit-baidu-map.service';
@Component({
  selector: 'app-history-track',
  templateUrl: './history-track.component.html',
  styleUrls: ['./history-track.component.scss']
})
export class HistoryTrackComponent implements OnInit, OnDestroy {
  public singleExpand = false; // 隐藏显示时间段内详情
  public filterDateExpand = false; // 筛选日期
  public getDid: any; // 获取Did
  public Did: number; // Did
  public TrackData: any;  // 列表
  public showID: number;
  public selectID: number;
  public getRenderList: any;
  public showAlert = false;
  public message: string;
  public eventCountInfo: any;
  public isPlayCtrl: any;
  public isSearchArea: any;

  constructor(
    private historyTrackService: HistoryTrackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) { }
  ngOnInit() {
    this.getRouteDid();
  }

  // 获取Did
  getRouteDid() {
    this.getDid = this.activatedRoute.parent.parent.params.subscribe((params: { Did: string }) => {
      this.Did = parseInt(params.Did, 10);
      this.TrackTrajectoryList(this.Did);
    });
  }


  // 获取行程轨迹列表
  TrackTrajectoryList(Did?, StartTime?, EndTime?) {
    const data = {
      Did: Did,
      StartTime: StartTime,
      EndTime: EndTime
    };
    this.getRenderList = this.historyTrackService.TrackTrajectoryList(data).subscribe((res) => {
      if (res.State) {
        this.TrackData = res.Data;
      }
    }, (err) => {
      
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }


  // 选择事件
  selected(trackId) {
    if (this.selectID !== trackId) {
      this.getTrack(trackId);
    }
    this.selectID = trackId;
  }



  // getTrack 点击行程列表
  getTrack(trackId) {
    this.historyTrackService.TrackTrajectory(trackId).subscribe((res) => {
      if (res.State) {
        this.eventsService.emitMessageEvent(this.eventsService.getNames().EVENT_CAR_LOCATION_HISTORY_TRACK, res.Data);
        if (!res.Data.GPSPoints.size) {
          this.showAlert = true;
          this.message = '哎呀，没有GPS记录!';
        }
      }
    }, (err) => {
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }


  // 筛选
  search(event) {
    this.TrackTrajectoryList(this.Did, event.startTime, event.endTime);
  }


  // 展开显示事件
  isExpand(id) {
    if (this.showID !== id) {
      this.showID = id;
    } else {
      this.showID = null;
    }
  }

  // 显示事件统计
  showEventCount(trackid) {
    const data = { TrackId: trackid };
    this.historyTrackService.TrackEventCount(data).subscribe((res) => {
      this.eventCountInfo = res.Data;
    }, (err) => {
      
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }



  // 销毁
  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    if (this.getDid) {
      this.getDid.unsubscribe();
    }
  }
}
