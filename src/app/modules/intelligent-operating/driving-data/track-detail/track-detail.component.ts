import { Component, OnInit, OnDestroy, ViewChild, transition } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MitBaiduMapComponent } from '../../../../widgets/mit-baidu-map/mit-baidu-map.component';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';

// 服务
import { DrivingDataService } from '../driving-data.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss'],
  animations: [fadeIn]
})
export class TrackDetailComponent implements OnInit, OnDestroy {
  @ViewChild(MitBaiduMapComponent) mitBaiduComponent: MitBaiduMapComponent;
  public getId: any;
  public TrackId: number;
  public TrackData: any;
  public TrackLineData: any;
  public gpsPoints: any;
  public TrackMileageInfoList: any; // 行程车速占比图表设置

  public currentEventType = [];
  public overlayArr = [];

  public pointOverlayArr = []; // 轨迹点覆盖物数组
  public pointMarkers = [];  // 轨迹点弹出层数组

  public gradientStatus: boolean = false;  // 渐变轨迹显示状态
  public gradientPath = false; // 渐变轨迹说明状态

  constructor(
    private drivingdataService: DrivingDataService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getId = this.activatedRoute.params.subscribe((params: { trackid: string }) => {
      this.TrackId = parseInt(params.trackid, 10);
      this.getTrackTrafficData(this.TrackId);
      this.InitBMap();
    });
  }


  InitBMap() {
    this.mitBaiduComponent.LoadBMap('Iz0YCH1ZtoxHyzhlD7yyz2fNckw8FRq5').then(() => {
      this.mitBaiduComponent.Init(); // 初始化百度地图
      this.GetTrackTrajectory(this.TrackId);
    });
  }

  getTrackTrafficData(data) {
    this.drivingdataService.SingleTrackTrafficData(data).subscribe((res) => {
      if (res.State) {
        this.TrackData = res.Data;
        this.InitTrackMileageInfoList(this.TrackData.TrackMileageInfoList);
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

  InitTrackMileageInfoList(data) {
    const MileageData = [];
    const PercentageData = [];
    data.forEach((item) => {
      MileageData.push(item.Mileage);
      PercentageData.push(parseFloat(item.Percentage.substr(0, item.Percentage.length - 1)));
    });

    this.TrackMileageInfoList = {
      color: ['#c6e25f'],
      tooltip: {
        trigger: 'axis',
        formatter: '{c} %',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '5%',
        right: '2%',
        bottom: '8%',
        containLabel: true
      },
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          fontSize: 14,
          color: '#6d7b88'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['0~20', '20~40', '40~60', '60~90', '90~120', '>120'],
          name: '车速段 (km/h)',
          nameLocation: 'middle',
          nameGap: 30,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '里程 (km)',
          nameLocation: 'middle',
          nameGap: 30,
        }
      ],
      series: [
        {
          name: '里程',
          type: 'bar',
          barWidth: '60%',
          data: PercentageData
        }
      ]
    };


  }


  GetTrackTrajectory(TrackId) {
    this.drivingdataService.TrackTrajectory(TrackId).subscribe((res) => {
      if (res.State) {
        this.TrackLineData = res.Data;
        this.gpsPoints = res.Data.GPSPoints.points;
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
        item.icon = '../../../assets/images/car_location/tracks/' + item.EventType + '.png';
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

  ngOnDestroy() {
    this.mitBaiduComponent.Clear();
    this.overlayArr = [];
  }
}
