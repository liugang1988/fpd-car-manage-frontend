import { Component, OnInit, OnChanges, OnDestroy, SimpleChange, Input, Output, HostListener, EventEmitter, SimpleChanges } from '@angular/core';
import { ElementRef } from '@angular/core';

// 枚举
import { DeviceStatusEnum } from './enum/device-status.enum';

// 服务
import { MitBaiduMapLoaderService } from './services/mit-baidu-map.loader.service';
import { MitBaiduMapService } from './services/mit-baidu-map.service';

@Component({
  selector: 'app-mit-baidu-map',
  templateUrl: './mit-baidu-map.component.html',
  styleUrls: ['./mit-baidu-map.component.scss']
})
export class MitBaiduMapComponent implements OnInit {
  overlayArr: Array<any> = []; // 覆盖物数组
  EventOverlayArr: Array<any> = []; // 事件覆盖数组
  pointArr: Array<any> = []; // 坐标集
  currentMap: any; // 当前地图
  luShuEvent: any; // 路书事件
  polyline: any;
  carOverlay: any;

  startMaker: any;
  defaultZoom: number = 19;

  constructor(private el: ElementRef, private bmapService: MitBaiduMapService, private loader: MitBaiduMapLoaderService) { }

  // 组件初始化 异步加载百度地图
  ngOnInit() {

  }

  LoadBMap(ak) {
    return this.loader.load(ak);
  }

  LoadLushu() {
    this.loader.loadLushu();
  }

  LoadDrawingManager() {
    return this.loader.loadDrawingManager();
  }


  // 初始化
  Init() {
    this.currentMap = new BMap.Map(this.el.nativeElement, { enableMapClick: false });
    this.currentMap.setMapStyle({ style: 'googlelite' });
    const point = new BMap.Point(116.404, 39.915);
    this.currentMap.centerAndZoom(point, 13); // 初始位置
    this.currentMap.enableScrollWheelZoom(); // 启用滚动放大缩小
    this.currentMap.disableDoubleClickZoom(); // 启用双击放大
    this.currentMap.enableDragging();   // 两秒后开启拖拽
    this.currentMap.enableInertialDragging();  // 启动地图惯性拖拽
  }


  // 路书初始化
  InitLuShu(pointArr) {
    const car = new BMap.Icon('../../../assets/images/car_location/tracks/car.png', new BMap.Size(50, 30)); // 车
    const lushu = new BMapLib.LuShu(this.currentMap, pointArr, {
      defaultContent: '', // 覆盖物内容，这个填上面的特殊点文字才会显示
      speed: 500, // 路书速度
      icon: car, // 覆盖物图标
      autoView: true, // 自动调整路线视野
      enableRotation: true, // 覆盖物随路线走向
      landmarkPois: []
    });
    this.bmapService.SetLushu(lushu);
  }

  // 本地搜索
  LocalSearch(value){
    var local = new BMap.LocalSearch(this.currentMap,{
      renderOptions:{map: this.currentMap}
    })
    local.search(value);
  }

  // 添加标注
  MakerIcon(data, width?, height?, offset?) {
    const myIcon = new BMap.Icon(data.icon, new BMap.Size(width, height), { offset: new BMap.Size((width / 2).toFixed(), (height / 2).toFixed()) });  // 创建标注对象并添加到地图
    const marker = new BMap.Marker(data.point, { icon: myIcon });
    return marker;
  }

  // 获取物理地址
  GetAddress(car) {
    return this.bmapService.getAddress(car.Lat, car.Lng);
  }

  // 设置视图位置
  SetView(pointArr, currentZoom?) {
    if (pointArr.length) {
      if (currentZoom) { // 重置地图视野及地图级别偏移
        currentZoom = currentZoom < 10 ? 10 : currentZoom;
        this.currentMap.setViewport(pointArr, { zoomFactor: currentZoom - 18 });
        console.log(this.currentMap.getZoom())
      } else {
        this.currentMap.setViewport(pointArr);
      }
    } else {
      this.IpCity(this.currentMap);
    };
  }


  // 画线
  MakerLine(pointArr, arr?) {
    if (arr) {
      for (let i = 0; i < pointArr.length - 1; i++) {  // 渐变折线
        const polyline = new BMap.Polyline([pointArr[i], pointArr[i + 1]],
          { strokeColor: this.setColor(arr[i].speed), strokeWeight: 6, strokeOpacity: 1 });
        this.currentMap.addOverlay(polyline);
      }
    } else {
      const polyline = new BMap.Polyline(pointArr,
        { strokeColor: '#02b430', strokeWeight: 6, strokeOpacity: 1 });
      this.currentMap.addOverlay(polyline);
    }
  }

  // 设置线段颜色
  setColor(speed) {
    if (speed <= 80) {
      return '#02b430';
    } else if (speed > 80 && speed <= 100) {
      return '#476cea';
    } else if (speed > 100 && speed < 120) {
      return '#fde800';
    } else if (speed >= 120) {
      return '#bb2828';
    }
  }

  // 遍历点
  PointForEach(pointArr): Promise<any> {
    const _pointArr = [];
    const p = new Promise((resolve) => {
      pointArr.forEach((item, index) => {
        this.GetPoint(item.location[0], item.location[1]).then((point) => {
          _pointArr.push(point);
        });
      });
      resolve(_pointArr);
    });
    return p;
  }

  // 获取位置
  GetPoint(Lng, Lat): Promise<any> {
    const p = new Promise((resolve) => {
      const point = this.bmapService.getPoint(Lng, Lat);
      resolve(point);
    });
    return p;
  };

  // 地址解析
  Geocoder(point): Promise<any> {
    const geoc = new BMap.Geocoder();
    const p = new Promise((resolve) => {
      geoc.getLocation(point, (rs) => {
        resolve(rs);
      });
    });
    return p;
  }

  // 所在城市定位
  IpCity(map) {
    function myFun(result) {
      const cityName = result.name;
      map.setCenter(cityName);
    }
    const myCity = new BMap.LocalCity();
    myCity.get(myFun);
  };

  // 设置画线上的点覆盖物
  pointOverlay(event) {
    // 自定义覆盖物的构造函数
    function CircleOverlay() {
      this.event = event;
    }
    // 继承API的BMap.Overlay
    CircleOverlay.prototype = new BMap.Overlay();
    // 实现初始化方法
    CircleOverlay.prototype.initialize = function (map) {
      // 保存map对象实例
      this._map = map;
      // 创建div元素，作为自定义覆盖物的容器
      const div = document.createElement('div');
      // 可以根据参数设置元素外观
      div.style.position = 'absolute';
      div.style.display = 'block';
      div.style.width = 12 + 'px';
      div.style.height = 12 + 'px';
      div.style.backgroundColor = "#5ba2de";
      div.style.borderRadius = 6 + 'px';
      div.style.border = '3px solid #5ba2de';
      div.style.cursor = "pointer";
      div.style.opacity = "0";

      map.getPanes().markerPane.appendChild(div);
      // 保存div实例
      this._div = div;
      div.addEventListener("mouseover", function () {
        if (div) {
          div.style.backgroundColor = "#ffffff";
          div.style.border = '3px solid #000000';
          div.style.opacity = "1";
        }
      });
      div.addEventListener("mouseout", function () {
        if (div) {
          div.style.backgroundColor = "#5ba2de";
          div.style.border = '3px solid #5ba2de';
          div.style.opacity = "0";
        }
      });
      return div;
    }

    // 实现绘制方法
    CircleOverlay.prototype.draw = function () {
      const map = this._map;
      const pixel = map.pointToOverlayPixel(event.point);
      this._div.style.top = pixel.y - 6 + 'px';
      this._div.style.left = pixel.x - 6 + 'px';
    };
    return new CircleOverlay();
  }

  // 轨迹点事件信息覆盖物
  EventPointOverlay(event) {
    // 定义自定义覆盖物的构造函数
    function SquareOverlay() {
      this.event = event;
    }
    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay();
    // 实现初始化方法
    SquareOverlay.prototype.initialize = function (map) {
      // 设置覆盖层数据
      let ParaContent = '';
      ParaContent = ParaContent + "速度：" + event.speed + "km/h";
      ParaContent = ParaContent + '<br/>';
      ParaContent = ParaContent + "地址：" + event.address;
      ParaContent = ParaContent + '<br/>';
      ParaContent = ParaContent + "时间：" + event.create_time;

      // 保存map对象实例
      this._map = map;

      // 创建div元素，作为自定义覆盖物的容器
      const div = document.createElement('div');
      //初始高度
      this.height = 60;
      // 可以根据参数设置元素外观
      div.style.position = 'absolute';
      div.style.zIndex = '999';
      div.style.display = 'none';
      div.style.height = this.height + 'px';

      // 高度
      const content = `<div style='display:block;z-index:9999;cursor: default;padding:10px; border-radius: 5px;width:300px;font-size:14px;opacity: 0.7;background-color: #000000;color: #fff;'>
                        <div class='row'>
                          <div class='col-12'>
                            ${ParaContent}
                            </div>
                        </div>
                      </div>
                      <div style='width:0;height:0 ;opacity: 0.7;border-top:20px solid black;border-left:10px solid transparent;border-right:10px solid transparent;margin-left:50px'></div>`;

      div.innerHTML = content;
      map.getPanes().markerPane.appendChild(div);
      // 保存div实例
      this._div = div;
      div.addEventListener("mouseover", function () {
        map.enableMapClick = false;
        div.style.display = '';
      });
      div.addEventListener("mouseout", function () {
        map.enableMapClick = true;
        div.style.display = 'none';
      });

      return div;
    };
    // 实现绘制方法
    SquareOverlay.prototype.draw = function () {
      const map = this._map;
      const pixel = map.pointToOverlayPixel(event.point);
      let offseTop = this.height * 2 + 6;
      this._div.style.left = pixel.x - 60 + 'px';
      this._div.style.top = pixel.y - Math.abs(offseTop) + 'px';

    };

    return new SquareOverlay();
  }

  // 事件信息覆盖物
  EventOverlay(event) {
    // 定义自定义覆盖物的构造函数
    function SquareOverlay() {
      this.event = event;
    }
    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay();

    // 实现初始化方法
    SquareOverlay.prototype.initialize = function (map) {
      // 设置覆盖层数据
      let ParaContent = '';
      const eventArr = event.EventMsg ? event.EventMsg.split('&') : [];
      if (eventArr.length > 0) {
        if (event.address) {
          eventArr.push(event.address);
        }
        eventArr.forEach((item, index) => {
          let ParaContentTemp = item;
          if (index === 0) {
            ParaContentTemp = '<strong>' + item + '</strong>';
          }
          ParaContent = ParaContent + ParaContentTemp;
          ParaContent = ParaContent + '<br/>';
        });
      }

      if (event.time) {
        const ParaContentTemp = event.time;
        const ParaContentAddress = event.address;
        ParaContent = ParaContent + ParaContentTemp;
        ParaContent = ParaContent + '<br/>';
        ParaContent = ParaContent + ParaContentAddress;
        ParaContent = ParaContent + '<br/>';
      }

      // 保存map对象实例
      this._map = map;

      // 创建div元素，作为自定义覆盖物的容器
      const div = document.createElement('div');
      this.height = 20 * eventArr.length;

      // 可以根据参数设置元素外观
      div.style.position = 'absolute';
      div.style.zIndex = '999';
      div.style.display = 'none';
      div.style.height = this.height + 'px';

      // 高度
      const content = `<div style='display:block;z-index:9999;cursor: default;padding:10px; border-radius: 5px;width:300px;font-size:14px;opacity: 0.7;background-color: #000000;color: #fff;'>
                        <div class='row'>
                          <div class='col-12'>
                            ${ParaContent}
                            </div>
                        </div>
                      </div>
                      <div style='width:0;height:0 ;opacity: 0.7;border-top:20px solid black;border-left:10px solid transparent;border-right:10px solid transparent;margin-left:50px'></div>`;

      div.innerHTML = content;
      map.getPanes().markerPane.appendChild(div);
      // 保存div实例
      this._div = div;
      div.onmouseover = function () {
        map.enableMapClick = false;
        // map.disableDragging();
        div.style.display = '';
         div.style.zIndex = '99';
      };
      div.onmouseout = function () {
        map.enableMapClick = true;
        // map.enableDragging();
        div.style.display = 'none';
        div.style.zIndex = '9';
      };
      return div;
    };

    // 实现绘制方法
    SquareOverlay.prototype.draw = function () {
      const map = this._map;
      const pixel = map.pointToOverlayPixel(event.point);
      let offseTop = this.height + 80;
      this._div.style.left = pixel.x - 55 + 'px';
      if (event.time) {
        offseTop = offseTop + 35;
      }
      this._div.style.top = pixel.y - Math.abs(offseTop) + 'px';
    };

    return new SquareOverlay();
  }

  // 车辆信息覆盖物
  CarOverlay(car) {
    // 定义自定义覆盖物的构造函数
    function SquareOverlay() {
      this.car = car;
    }
    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay();

    const self = this;

    // 实现初始化方法
    SquareOverlay.prototype.initialize = function (map) {
      // 保存map对象实例
      this._map = map;
      // 创建div元素，作为自定义覆盖物的容器
      const div = document.createElement('div');
      div.style.position = 'absolute';
      // 可以根据参数设置元素外观
      div.style.zIndex = '999';
      div.style.display = 'none';
      let content;
      let history_url;
      let real_url;
      if(window.location.hash.indexOf('#/page/car-location') != -1){
        history_url = '/#/page/car-location/control/'+ car.Did +'/history-track';
        if(car.DeviceStatus == 8){
          real_url = '/#/page/car-location/control/'+ car.Did +'/real-time' ;
       }
        else{
          real_url = 'javascript:void(0)';
        }
      }else if(window.location.hash.indexOf('#/page/insurance-management/car-location') != -1){
        history_url = '/#/page/insurance-management/car-location/control/'+ car.Did +'/history-track';
        if(car.DeviceStatus == 8){
          real_url = '/#/page/insurance-management/car-location/control/'+ car.Did +'/real-time' ;
        }else{
          real_url = 'javascript:void(0)';
        }
      }

      // 当车辆处于行驶状态时才能查看实时轨迹
      content = `<div style='z-index:9999;cursor: default;padding:10px; border-radius: 5px;width:390px;font-size:14px;opacity: 0.7;background-color: #000000;color: #fff;'>
                        <div class='row'>
                          <div class='col-7'> 车牌： <a href='/#/page/base-data/vehicle-information/detail/${car.Vid}' target="_blank" style='color:#337ab7'> ${car.Plate || ''}</a></div>
                          <div class='col-5'> 驾驶员：<a href='/#/page/base-data/driver-manage/detail/${car.DriverID}' target="_blank" style='color:#337ab7'> ${car.DriverName || ''} </a></div>
                        </div>
                        <div class='row'>
                          <div class='col-7'> 状态：${car.OBDStatus || ''} </div>
                          <div class='col-5'> 车速：${car.DeviceStatus !== 1 && car.DeviceStatus !== 16 ? car.Speed : 0} km/h</div>
                        </div>
                        <div class='row'>
                          <div class='col-7'>时间：${car.CreateTime ? car.CreateTime.substr(0, 19).replace(/T/mg, ' ') : ''} </div>
                          <div class='col-5'> 航向：${self.changeSensor(car.Sensor)}</div>
                        </div>
                        <div class='row' style='padding-bottom:10px'>
                          <div class='col-12'> 位置：${car.address || '未能获取到位置信息'}
                            </div>
                        </div>
                        <div class='row' style='font-size:14px'>
                          <div class='col-7'>
                            <a href='${history_url}'>历史轨迹</a>
                          </div>
                          <div class='col-5'>
                             <a href='${real_url}'>实时轨迹</a>
                          </div>
                        </div>
                      </div>
                      <div style='width:0;height:0 ;opacity: 0.7;border-top:20px solid black;border-left:10px solid transparent;border-right:10px solid transparent;margin-left:50px'></div>`;
      
      div.innerHTML = content;
      map.getPanes().markerPane.appendChild(div);
      // 保存div实例
      this._div = div;

      div.onmouseover = function () {
        map.enableMapClick = false;
        // map.disableDragging();
        div.style.display = '';
      };
      div.onmouseout = function () {
        map.enableMapClick = true;
        // map.enableDragging();
        div.style.display = 'none';
      };
      return div;
    };

    // 实现绘制方法
    SquareOverlay.prototype.draw = function () {
      const map = this._map;
      const pixel = map.pointToOverlayPixel(car.point);
      this._div.style.left = pixel.x - 60 + 'px';
      this._div.style.top = pixel.y - 175 + 'px';
    };

    return new SquareOverlay();
  }

  // 航向转换
  changeSensor(val){
    if(val == 0 ){
      return '正北向';
    }else if(val > 0 && val <= 22.5){
      return '北向';
    }else if(val > 22.5 && val <= 45){
      return '东北向偏北';
    }else if(val > 45 && val <= 67.5){
      return '东北向';
    }else if(val > 67.5 && val < 90){
      return '东北向偏东';
    }else if(val == 90){
      return '正东向';
    }else if(val > 90 && val <= 112.5){
      return '东向';
    }else if(val > 112.5 && val <= 135){
      return '东南向偏东';
    }else if(val > 135 && val <= 157.5){
      return '东南向';
    }else if(val > 157.5 && val < 180){
      return '东南向偏南';
    }else if(val == 180){
      return '正南向';
    }else if(val > 180 && val <= 202.5){
      return '南向';
    }else if(val > 202.5 && val <= 225){
      return '西南向偏南';
    }else if(val > 225 && val <= 247.5){
      return '西南向';
    }else if(val > 247.5 && val < 270){
      return '西南向偏西';
    }else if(val == 270){
      return '正西向';
    }else if(val > 270 && val <= 292.5){
      return '西向';
    }else if(val > 292.5 && val <= 315){
      return '西北向偏西';
    }else if(val > 315 && val <= 337.5){
      return '西北向';
    }else if(val > 337.5 && val < 360){
      return '西北向偏北';
    }else if(val == 360){
      return '正北向';
    }else {
      return '';
    }
  }

  // 标注起点
  MakerSartPoint(start_point) {
    this.GetPoint(start_point.longitude, start_point.latitude).then((point) => {
      start_point.point = point;
      start_point.icon = '../../../assets/images/car_location/tracks/start.png';
      const marker = this.MakerIcon(start_point, 28, 40);
      this.currentMap.addOverlay(marker);
      this.startMaker = marker;
    });
  }

  // 标注终点
  MakerEndPoint(end_point) {
    this.GetPoint(end_point.longitude, end_point.latitude).then((point) => {
      end_point.point = point;
      end_point.icon = '../../../assets/images/car_location/tracks/end.png';
      const marker = this.MakerIcon(end_point, 28, 40);
      this.currentMap.addOverlay(marker);
      return marker;
    });
  }



  // 清理地图
  Clear() {
    console.log('清除地图覆盖物');
    const arrayOverlays = this.currentMap.getOverlays();
    if (arrayOverlays.length) {
      this.currentMap.clearOverlays();
    }
  }
}


export enum ControlAnchor {
  BMAP_ANCHOR_TOP_LEFT = 0,
  BMAP_ANCHOR_TOP_RIGHT = 1,
  BMAP_ANCHOR_BOTTOM_LEFT = 2,
  BMAP_ANCHOR_BOTTOM_RIGHT = 3
}


