import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http'; // http模块
import { Observable } from 'rxjs/Observable'; // 异步数据流控制
import 'rxjs/add/operator/map';


@Injectable()
export class MitBaiduMapService {
  private lushu: any;
  constructor( private _jsonp: Jsonp ) { }

  LushuControl( atcion ) {
    switch ( atcion ) {
      case 'start':
        this.lushu.start();
        break;
      case 'stop':
        this.lushu.stop();
        break;
      case 'pause':
        this.lushu.pause();
        break;
      default:
    }
  }

  SetLushu( lushu ) {
    this.lushu = lushu;
  }

  // 经纬度转物理地址-百度地图
  getAddress( lat, lng ) {
    const url = `http://api.map.baidu.com/geocoder/v2/?ak=B83hQj5Nx0x7gA5RQLEaCD11W6IElNQa&callback=JSONP_CALLBACK&location=${lat},${lng}&output=json&pois=1`;
    return this._jsonp.get( url ).map(( res ) => res.json() );
  }

  // 坐标转换
  getPoint( Lng, Lat ) {
    return new BMap.Point( Lng, Lat );
  }



}
