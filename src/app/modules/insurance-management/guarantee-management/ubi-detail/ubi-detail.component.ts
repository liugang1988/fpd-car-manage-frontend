import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { GuaranteeManagementService } from '../guarantee-management.service';
import { EventsService } from '../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';

//
import { MitBaiduMapComponent } from '../../../../widgets/mit-baidu-map/mit-baidu-map.component';

@Component({
  selector: 'app-ubi-detail',
  templateUrl: './ubi-detail.component.html',
  styleUrls: ['./ubi-detail.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class UbiDetailComponent implements OnInit, OnDestroy {
  @ViewChild(MitBaiduMapComponent) mitBaiduComponent: MitBaiduMapComponent;
  public getId:any;
  public ubiInsuranceDetail:any;
  public _ubiInsuranceDetail:any;
  public TrackId: number;
  public TrackData: any;
  public TrackLineData: any;
  public TrackMileageInfoList: any; // 行程车速占比图表设置

  public currentEventType = [];
  public overlayArr = [];

  public pointOverlayArr = []; // 轨迹点覆盖物数组
  public pointMarkers = [];  // 轨迹点弹出层数组

  public gradientStatus: boolean = false;  // 渐变轨迹显示状态
  public gradientPath = false; // 渐变轨迹说明状态
  constructor(
    private eventsService: EventsService,
    private guaranteeManagementService: GuaranteeManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkAction();
  }

  // 获取ID
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { ID: string }) => {
      if (params.ID) {
        this.TrackId = parseInt(params.ID, 10);
        this.getDetail({ ID: this.TrackId });
        this.InitBMap();
      }
    });
  }

  // 获取详情
  getDetail(data){
    this._ubiInsuranceDetail = this.guaranteeManagementService.GetTrackUBIInsurance(data).subscribe((res)=>{
      if(res.Data){
        this.ubiInsuranceDetail = res.Data;
      }
    },(err)=>{
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

  InitBMap() {
    this.mitBaiduComponent.LoadBMap('Iz0YCH1ZtoxHyzhlD7yyz2fNckw8FRq5').then(() => {
      this.mitBaiduComponent.Init(); // 初始化百度地图
      this.GetTrackTrajectory({TrackId: this.TrackId});
    });
  }

  GetTrackTrajectory(TrackId) {
    this.guaranteeManagementService.TrackTrajectory(TrackId).subscribe((res) => {
      if (res.State) {
        this.TrackLineData = res.Data;
        this.ShowHistoryLine(this.TrackLineData);
        // this.filterCurrentEvent(this.TrackLineData.GPSEvents);
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

  // 标注所有事件
  MakerAllEventPoint(array?) {
    array.forEach((item) => {
      this.mitBaiduComponent.GetPoint(item.Lng, item.Lat).then((point) => {
        item.point = point;
        item.icon = '../../assets/images/car_location/tracks/' + item.EventType + '.png';
        this.SetEventMaker(item);
        this.SetIcon(item, 29, 35);
      });
    });
  }

  // 设置图标
  SetIcon(point, width, height) {
    const marker = this.mitBaiduComponent.MakerIcon(point, width, height);
    this.mitBaiduComponent.currentMap.addOverlay(marker);
    marker.addEventListener('click', () => {
      this.ShowOverlay(point);
    });

  }

  // 显示所有轨迹上的点
  MakerAllOverlayPoint(array) {
    array.forEach((item) => {
      this.mitBaiduComponent.GetPoint(item.location[0], item.location[1]).then((point) => {
        item.point = point;
        this.SetEventPointMaker(item);
        this.SetPoint(item);
      });
    });
  }

  // 设置轨迹点
  SetPoint(point) {
    let overlay;
    overlay = this.mitBaiduComponent.pointOverlay(point);
    this.pointOverlayArr.push(overlay);
    this.mitBaiduComponent.currentMap.addOverlay(overlay);
    overlay._div.addEventListener('click', () => {
      this.ShowPointOverlay(point);
    });
  }

  // 设置轨迹点事件信息覆盖物
  SetEventPointMaker(point) {
    let overlay;
    this.mitBaiduComponent.GetAddress({ Lng: point.location[0], Lat: point.location[1] }).subscribe((res) => {
      point.address = res.result.formatted_address + res.result.sematic_description;
      overlay = this.mitBaiduComponent.EventPointOverlay(point);
      this.pointMarkers.push(overlay);
      this.mitBaiduComponent.currentMap.addOverlay(overlay);
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

  // 显示轨迹点弹窗
  ShowPointOverlay(e) {
    this.pointMarkers.forEach((item, key) => {
      if ((item.event && item.event.point.lng === e.point.lng && item.event.point.lat === e.point.lat)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  // 显示信息弹窗
  ShowOverlay(e) {
    this.overlayArr.forEach((item, key) => {
      if (item.event.Lng === e.Lng && item.event.Lat === e.Lat) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  // 设置事件覆盖层
  SetEventMaker(point) {
    let overlay;
    this.mitBaiduComponent.GetAddress(point).subscribe((res) => {
      point.address = "地址：" + res.result.formatted_address + res.result.sematic_description;
      overlay = this.mitBaiduComponent.EventOverlay(point);
      this.overlayArr.push(overlay);
      this.mitBaiduComponent.currentMap.addOverlay(overlay);
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


  // 显示车辆历史轨迹
  ShowHistoryLine(Data, CheckEventList?) {
    this.mitBaiduComponent.Clear();
    this.mitBaiduComponent.MakerSartPoint(Data.GPSPoints.start_point); // 标注起点
    this.mitBaiduComponent.MakerEndPoint(Data.GPSPoints.end_point); // 标注终点
    this.MakerAllOverlayPoint(Data.GPSPoints.points); // 标注轨迹点

    // 筛选
    if (CheckEventList) {
      const _event = [];
      Data.GPSEvents.forEach((event) => {
        CheckEventList.forEach((checkList) => {
          if (event.EventType == checkList.id) {
            _event.push(event);
          }
        });
      });
      this.MakerAllEventPoint(_event); // 标注事件
    } else {
      //this.MakerAllEventPoint(Data.GPSEvents); // 标注事件
    }

    // 画线
    this.mitBaiduComponent.PointForEach(Data.GPSPoints.points).then((pointArr) => {
      if (this.gradientStatus) {
          // 当速度段状态选中,则显示渐变轨迹说明,否则不显示
          this.gradientPath = true;
          this.mitBaiduComponent.MakerLine(pointArr, Data.GPSPoints.points);
        } else {
          this.gradientPath = false;
          this.mitBaiduComponent.MakerLine(pointArr);
        }
      //this.mitBaiduComponent.MakerLine(pointArr, Data.GPSPoints.points);
      setTimeout(() => {
        this.mitBaiduComponent.SetView(pointArr);
      }, 300);
    });

  }


  // 轨迹行程事件筛选
  changeShowEvent(EventList) {
    // 订阅的数据如果是状态,则显示速度段数据,否则显示事件数据
    if(typeof EventList == 'boolean'){
      this.gradientStatus = EventList;
      this.ShowHistoryLine(this.TrackLineData);
    }else{
       this.ShowHistoryLine(this.TrackLineData, EventList);
    }
  }

  // 取消
  back() {
    this.router.navigate(['../../ubiList/'+ this.TrackLineData.TrackInfo.VID], { relativeTo: this.activatedRoute });
  }

  // 销毁
  ngOnDestroy() {
    if(this._ubiInsuranceDetail){
      this._ubiInsuranceDetail.unsubscribe();
    }
    if(this.getId){
      this.getId.unsubscribe();
    }
    this.mitBaiduComponent.Clear();
    this.overlayArr = [];
  }

}
