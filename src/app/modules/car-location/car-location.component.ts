import { Component, OnInit, OnDestroy, OnChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { flyIn } from '../../animation/flyIn';
import { fadeIn } from './../../animation/fadeIn';
import { CarLocationService } from './car-location.service';
import { EventsService } from '../../services/events-service.service';

import { MitBaiduMapComponent } from '../../widgets/mit-baidu-map/mit-baidu-map.component';
import { MitBaiduMapLoaderService } from '../../widgets/mit-baidu-map/services/mit-baidu-map.loader.service';

@Component({
  selector: 'app-car-location',
  templateUrl: './car-location.component.html',
  styleUrls: ['./car-location.component.scss'],
  animations: [flyIn, fadeIn]
})
export class CarLocationComponent implements OnInit, OnDestroy {
  @ViewChild(MitBaiduMapComponent) mitBaiduComponent: MitBaiduMapComponent;
  public getPageChangeEvent: any;
  public vehicleCarObj: any;
  public showCarStatus = false;　 // 显示车辆状态统计
  public showFastSearch = false; // 显示快速搜索
  public showLoading = false; // 显示加载蒙层
  public message: string; // 蒙层信息
  public vehicleArr = []; // 车辆数组
  public overlayArr = [];  // 弹出层覆盖物数组
  public pointOverlayArr = []; // 轨迹点覆盖物数组
  public pointMarkers = [];  // 轨迹点弹出层数组
  public lastStateId = -1;
  public currentStateId: number;
  public timeout_1: any; // 计时器1
  public timeout_2: any; // 计时器2
  public pointArr = []; // 坐标点
  public speedArr = []; // 坐标点速度
  public endMaker: any;
  public currentUrl: string;
  public iconMarkers = [];

  public markerClusterer: any;
  public markerLabel:any;

  public startPoint: any;

  public TrackLineData: any;  // 行车数据
  public eventStatus: boolean = false;  // 行车事件状态
  public gradientPath = false; // 渐变轨迹说明状态

  public gradientStatus: boolean = false;  // 渐变轨迹显示状态

  public carIdArr = []; // 点击车图标显示覆盖物时存储的id

  constructor(

    private mitBaiduMapLoaderService: MitBaiduMapLoaderService,
    private carLocationService: CarLocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.mitBaiduComponent.LoadBMap('Iz0YCH1ZtoxHyzhlD7yyz2fNckw8FRq5').then(() => {
      this.mitBaiduComponent.LoadLushu();  // 加载路书
      this.mitBaiduComponent.Init(); // 初始化百度地图
      this.mitBaiduMapLoaderService.loadMarkerClusterer().then(() => {
        this.currentPage(this.router.url);
        this.PageChange();
        this.EventProxy();
      });
    });
  }


  // 事件代理
  EventProxy() {
    this.eventsService.getEmitter().subscribe((item) => {
      if (this.currentUrl === '/page/car-location/control/history-track' && item.data) {
        this.TrackLineData = item.data;
        this.ShowHistoryLine(item.data);
      } else if (this.currentUrl === '/page/car-location/control/real-time' && item.data) {
        this.ShowRealTimeLine(item.data);
      }
    }, (err) => {

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


  // 页面更改事件(页面切换时执行)
  PageChange() {
    this.getPageChangeEvent = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((evt: { url?: string, urlAfterRedirects?: string }) => {
        this.currentPage(evt.urlAfterRedirects);
      }, (err) => {

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

  // 默认状态
  defaultState() {
    switch (this.activatedRoute.snapshot.params['state']) {
      case 'all':
        this.lastStateId = -1;
        break;
      case 'run':
        this.lastStateId = 8;
        break;
      case 'stop':
        this.lastStateId = 16;
        break;
      case 'offline':
        this.lastStateId = 1;
        break;
      default:
        this.lastStateId = -1;
    }
  }



  // 根据当前页面执行事件
  currentPage(url) {
    this.currentUrl = url.replace(/\/\d+/g, '');
    switch (this.currentUrl) {
      case '/page/car-location/control/real-time': // 进入实时轨迹
        this.EnterRealTime();
        break;
      case '/page/car-location/control/history-track': // 进入历史轨迹
        this.EnterHistory();
        break;
      case '/page/car-location/control/single-vehicle/vehicle-info': // 进入单车面板
        this.EnterSingleCar();
        break;
      case '/page/car-location/control/single-vehicle/driver-info': // 进入单车面板
        this.EnterSingleCar();
        break;
      case '/page/car-location/control/single-vehicle/car-service-info': // 进入单车面板
        this.EnterSingleCar();
        break;
      case '/page/car-location/control/single-vehicle/statistics-info': // 进入单车面板
        this.EnterSingleCar();
        break;
      default: // 显示所有车辆
        this.EnterAllCar();
        break;
    }
  }

  // 显示所有车辆
  EnterAllCar() {
    this.currentStateId = undefined;
    this.defaultState();
    this.Clear();
    this.hiddenSome();
    this.message = '正在请求GPS数据...';
    this.showLoading = true;
    this.showFastSearch = true;
    this.VehiclePosition(this.lastStateId ? this.lastStateId : -1);
    this.reload();
  }

  // 运行30分钟，页面强制刷新一次
  reload(){
    const times = setTimeout(()=>{
      window.location.reload();
    }, 1800000); 
  }

  // 进入单车信息
  EnterSingleCar() {
    this.currentStateId = undefined;
    this.hiddenSome();
    this.VehiclePositionDetail(this.getChildDid());
  }

  // 进入实时轨迹
  EnterRealTime() {
    this.Clear();
    this.mitBaiduComponent.startMaker = undefined;
    this.currentStateId = undefined;
    this.hiddenSome();
  }

  // 进入历史轨迹
  EnterHistory() {
    this.Clear();
    this.currentStateId = undefined;
    this.hiddenSome();
  }


  // 打开单车面板
  OpenSingleVehicle(item) {
    // 存在Did时调整
    if (item.Did) {
      this.router.navigate(['/page/car-location/control', item.Did]);
    }
  }


  // 搜索事件
  SearchEvt(e) {
    this.vehicleArr.forEach((item, key) => {
      if (item.Plate === e) {
        this.OpenSingleVehicle(item);
      }
    });
  }

  // 状态更改
  ChangeState(e) {
    this.lastStateId = e;
    this.message = '正在请求GPS数据...';
    this.showLoading = true;
    this.VehiclePosition(this.lastStateId);
  }


  // 获取不同状态的车辆的数量
  VehiclePostionCount() {
    this.carLocationService.VehiclePostionCount().subscribe((res) => {
      this.showCarStatus = true;
      this.vehicleCarObj = res.Data;
    }, (err) => {

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


  // 获取单一车辆位置信息, 用于查找单车位置
  VehiclePositionDetail(Did) {
    this.Clear();
    this.vehicleArr = [];
    this.carLocationService.VehiclePositionDetail(Did).subscribe((res) => {
      this.vehicleArr.push(res.Data);
      this.ShowAllCar(this.vehicleArr);


      // 倒计时十秒刷新一次
      this.timeout_2 = setTimeout(() => {
        this.VehiclePositionDetail(Did);
      }, 10000);
    }, (err) => {

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




  // 获取不同状态车辆的位置
  VehiclePosition(e?: number) {
    this.VehiclePostionCount();
    
    
    this.carLocationService.VehiclePosition(e).subscribe((res) => {
      if (res.State) {
        this.showLoading = false;
        this.vehicleArr = res.Data;
        // this.cd.detectChanges();
        this.ShowAllCar(this.vehicleArr);
        // 倒计时十秒刷新一次
        this.timeout_2 = setTimeout(() => {
          // 这里是为了解决在合适的地图级别下请求纠偏数据的方法
          // const view = this.mitBaiduComponent.currentMap.getZoom();
          // console.log(view);
          this.VehiclePosition(e);
        }, 10000);


      }
    }, (err) => {

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




  // 显示车辆实时轨迹
  ShowRealTimeLine(item) {
    this.showLoading = false;
    const carIcon = new BMap.Icon('../../../assets/images/car_location/tracks/car.png', new BMap.Size(50, 30), { offset: new BMap.Size(20, 15) });
    if (item.GPSPoints.points && item.GPSPoints.points.length) {
      const currentZoom = this.mitBaiduComponent.currentMap.getZoom();
      // 清除地图覆盖物
      this.mitBaiduComponent.Clear();


      // 标记行程事件
      if (item.GPSEvents && item.GPSEvents.length) {
        this.MakerAllEventPoint(item.GPSEvents);
      }

      this.MakerAllOverlayPoint(item.GPSPoints.points); // 标注轨迹点


      // 画线
      this.mitBaiduComponent.PointForEach(item.GPSPoints.points).then((pointArray) => {
        this.mitBaiduComponent.MakerLine(pointArray);

        // 设置车图标

        // this.mitBaiduComponent.GetPoint(pointArray[pointArray.length - 1], item.GPSPoints.points[item.GPSPoints.points.length - 1].location[1]).then((point) => {
        const carMarker = new BMap.Marker(pointArray[pointArray.length - 1], { icon: carIcon });
        carMarker.setRotation(item.GPSPoints.points[item.GPSPoints.points.length - 1].direction - 90);
        this.mitBaiduComponent.currentMap.addOverlay(carMarker);
        this.mitBaiduComponent.SetView([pointArray[pointArray.length - 1]], currentZoom); // 重置视图

        // });
      });
      // 标注起点
      //if (!this.startPoint) {
      this.startPoint = item.GPSPoints.start_point;
      //}
      this.mitBaiduComponent.MakerSartPoint(this.startPoint);
      // 标记终点
      if (item.RealTimeTrip.EndStatus) {
        this.endMaker = this.mitBaiduComponent.MakerEndPoint(item.GPSPoints.end_point); // 标注终点
      }

    }

  }


  // 显示车辆历史轨迹
  ShowHistoryLine(item, CheckEventList?) {
    this.hiddenSome();
    if (item && item.GPSPoints) {
      this.Clear();
      this.mitBaiduComponent.MakerSartPoint(item.GPSPoints.start_point); // 标注起点
      this.mitBaiduComponent.MakerEndPoint(item.GPSPoints.end_point); // 标注终点
      this.MakerAllOverlayPoint(item.GPSPoints.points); // 标注轨迹点
      //this.MakerAllEventPoint(item.GPSEvents); // 标注事件

      if (CheckEventList && typeof CheckEventList == 'object') { // 当存在事件时，标记事件
        const _event = [];
        item.GPSEvents.forEach((event) => {
          CheckEventList.forEach((checkList) => {
            if (event.EventType == checkList.id) {
              _event.push(event);
            }
          });
        });
        this.MakerAllEventPoint(_event); // 标注事件
      }

      // 画线
      this.mitBaiduComponent.PointForEach(item.GPSPoints.points).then((pointArr) => {
        this.eventStatus = true;
        // 如果速度段状态选中,则显示渐变轨迹,否则显示一般轨迹,默认不选中
        if (this.gradientStatus) {
          // 当速度段状态选中,则显示渐变轨迹说明,否则不显示
          this.gradientPath = true;
          this.mitBaiduComponent.MakerLine(pointArr, item.GPSPoints.points);
        } else {
          this.gradientPath = false;
          this.mitBaiduComponent.MakerLine(pointArr);
        }
        this.mitBaiduComponent.InitLuShu(pointArr);
        this.mitBaiduComponent.SetView(pointArr);
      });

    } else {
      console.log('出错啦');
    }
  }


  // 轨迹行程事件筛选
  changeShowEvent(EventList) {
    // 订阅的数据如果是状态,则显示速度段数据,否则显示事件数据
    if (typeof EventList == 'boolean') {
      this.gradientStatus = EventList;
      this.ShowHistoryLine(this.TrackLineData);
    } else {
      this.ShowHistoryLine(this.TrackLineData, EventList);
    }
  }

  // 显示所有车辆
  ShowAllCar(array) {
    this.Clear();
    array.forEach((car: { Lng: number, Lat: number, point: any, icon: string, DeviceStatus: number, Did: number }) => {
      if (car.DeviceStatus) {
        this.mitBaiduComponent.GetPoint(car.Lng, car.Lat).then((point) => {
          this.pointArr.push(point);
          car.point = point;
          car.icon = '../../../assets/images/car_location/device_state/' + car.DeviceStatus + '.png';
          this.SetIcon(car, 28, 40, car.Did);
        });
      }
    });


    // 判断是否需要重置视图位置

    this.timeout_1 = setTimeout(() => {
      this.MarkerClusterer(this.iconMarkers);
      if (this.currentStateId !== this.lastStateId) {
        this.mitBaiduComponent.SetView(this.pointArr);
        this.currentStateId = this.lastStateId;
      }
    }, 100);


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



  // 标注所有事件
  MakerAllEventPoint(array) {
    array.forEach((item) => {
      this.mitBaiduComponent.GetPoint(item.Lng, item.Lat).then((point) => {
        item.point = point;
        item.icon = '../../../assets/images/car_location/tracks/' + item.EventType + '.png';
        this.SetEventMaker(item);
        this.SetIcon(item, 29, 35);
      });
    });
  }

  // 标注车辆
  MakerCar(car) {
    const carIcon = new BMap.Icon('../../../assets/images/car_location/tracks/car.png', new BMap.Size(50, 30), { offset: new BMap.Size(20, 15) });

    if (this.mitBaiduComponent.carOverlay) {
      this.mitBaiduComponent.currentMap.removeOverlay(this.mitBaiduComponent.carOverlay);
    }


    this.mitBaiduComponent.GetPoint(car.longitude, car.latitude).then((point) => {
      this.mitBaiduComponent.carOverlay = new BMap.Marker(point, { icon: carIcon});
      this.mitBaiduComponent.carOverlay.setRotation(car.direction - 90);
      this.mitBaiduComponent.currentMap.addOverlay(this.mitBaiduComponent.carOverlay);
    });
  }


  // 设置图标
  SetIcon(point, width, height, ID?) {
    const marker = this.mitBaiduComponent.MakerIcon(point, width, height);
    // 当存在ID，说明是显示所有车辆，则显示文字标签，否则，说明是显示事件图标
    if(ID){
      //添加文字标签
      this.markerLabel = new BMap.Label(point.Plate, {position: new BMap.Point(point.Lng, point.Lat), offset: new BMap.Size(30, 10)});
      this.markerLabel.setStyle({
        borderColor: '#666666',
        color: '#333333'
      })
      marker.setLabel(this.markerLabel);
    } else{
      this.mitBaiduComponent.currentMap.addOverlay(marker);
    }
    this.iconMarkers.push(marker);
    marker.addEventListener('click', () => {
      if (ID) {
        this.SetCarMaker(point, ID);
      } else {
        //this.SetCarMaker(point);
        this.ShowOverlay(point);
      }

    });

    // 双击事件
    marker.addEventListener('dblclick', () => {
      this.OpenSingleVehicle(point);
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

  // 设置事件信息覆盖物
  SetEventMaker(point) {
    let overlay;
    this.mitBaiduComponent.GetAddress(point).subscribe((res) => {
      point.address = "地址：" + res.result.formatted_address + res.result.sematic_description;
      overlay = this.mitBaiduComponent.EventOverlay(point);
      this.overlayArr.push(overlay);
      this.mitBaiduComponent.currentMap.addOverlay(overlay);
    }, (err) => {

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



  // 设置轨迹点事件信息覆盖物
  SetEventPointMaker(point) {
    let overlay;
    this.mitBaiduComponent.GetAddress({ Lng: point.location[0], Lat: point.location[1] }).subscribe((res) => {
      point.address = res.result.formatted_address + res.result.sematic_description;
      overlay = this.mitBaiduComponent.EventPointOverlay(point);
      this.pointMarkers.push(overlay);
      this.mitBaiduComponent.currentMap.addOverlay(overlay);
    });
  }

  // 元素是否在数组中
  contains(arr, elem){
    var len = arr.length;
    if(len){
      while(len--){
        if(arr[len] == elem ){
          return true;
        }
      }
      return false;
    }else{
      return false;
    }
  }

  // 设置车辆信息覆盖物
  SetCarMaker(car, ID?) {
    let overlay;
    this.mitBaiduComponent.GetAddress(car).subscribe((res) => {
      car.address = res.result.formatted_address + res.result.sematic_description;
      if (ID) {
        this.carLocationService.VehiclePositionDetail(ID).subscribe((res) => {
          if(!this.contains(this.carIdArr, ID)){  // 当点击的是已经点过的车辆，则不创建覆盖物直接显示
            car.OBDStatus = res.Data.OBDStatus;
            car.Speed = res.Data.Speed;
            car.CreateTime = res.Data.CreateTime;
            car.Sensor = res.Data.Sensor;
            car.Vid = res.Data.Vid;
            car.DriverID = res.Data.DriverID;
            car.DriverName = res.Data.DriverName;
            overlay = this.mitBaiduComponent.CarOverlay(car);
            this.overlayArr.push(overlay);
            this.mitBaiduComponent.currentMap.addOverlay(overlay);
            this.carIdArr.push(ID);
            this.ShowOverlay(car);
          }else{
            this.ShowOverlay(car);
          }
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
      } else {
        overlay = this.mitBaiduComponent.CarOverlay(car);
        this.overlayArr.push(overlay);
        this.mitBaiduComponent.currentMap.addOverlay(overlay);
      }
    }, (err) => {

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

  // 设置点聚合
  MarkerClusterer(markers) {
    if (this.markerClusterer) {
      this.markerClusterer.clearMarkers();
    }
    this.markerClusterer = new BMapLib.MarkerClusterer(this.mitBaiduComponent.currentMap, { markers: markers });
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
      if ((item.car && item.car.Did === e.Did) || (item.event && item.event.Lng === e.Lng && item.event.Lat === e.Lat && item.event.EventType === e.EventType)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  // 获取Did
  getChildDid() {
    return parseInt(this.activatedRoute.firstChild.snapshot.params['Did'], 10);
  }

  // 设置改变
  ChangeSetting(e) {
    console.log(e);
  }


  hiddenSome() {
    this.showFastSearch = false;
    this.showCarStatus = false;
    this.eventStatus = false;
    this.gradientPath = false;
  }

  Clear() {
    this.iconMarkers = [];
    this.overlayArr = [];
    this.pointArr = [];
    this.pointOverlayArr = [];
    this.pointMarkers = [];
    this.carIdArr = [];

    this.mitBaiduComponent.Clear();
    clearTimeout(this.timeout_1);
    clearTimeout(this.timeout_2);
    if (this.markerClusterer) {
      this.markerClusterer.clearMarkers();
    }
  }


  ngOnDestroy() {
    this.Clear();
    this.getPageChangeEvent.unsubscribe();
  }

}
