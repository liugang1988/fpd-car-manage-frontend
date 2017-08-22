
import { Injectable } from '@angular/core';

// 回调判断是否初始化地图
// tslint:disable-next-line:callable-types
interface JSONPCallback {
  (json: any): void;
}

@Injectable()
export class MitBaiduMapLoaderService {

  constructor() { }
  // 百度地图异步加载
  load(ak: string): Promise<any> {
    const Map_URL = '//api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=JSONP_CALLBACK';
    const p = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.setAttribute('src', Map_URL);
      script.async = true;
      // script.onload = function () {
      //   script.parentNode.removeChild( script );
      // };
      window['JSONP_CALLBACK'] = function (json) {
        script.parentNode.removeChild(script);
        resolve(json);
      };

      document.head.appendChild(script);
    });

    return p;
  }

  // 加载路书
  loadLushu() {
    const MapLuShu_URL = '//api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('src', MapLuShu_URL);
    script.async = true;
    script.onload = function () {
      script.parentNode.removeChild(script);
    };
    document.head.appendChild(script);

  }



  // 加载点聚合依赖包
  loadMarkerClusterer(): Promise<true> {
    const URL = ['http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js', '/assets/MarkerClusterer_min.js'];
    const p = new Promise(function (resolve, reject) {
      URL.forEach((i, index) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.setAttribute('src', i);
        script.async = true;
        script.onload = function () {
          script.parentNode.removeChild(script);
          if (index === URL.length - 1) {
            resolve(true);
          }
        };
        document.head.appendChild(script);
      });
    });
    return p;
  }




  // 加载绘制依赖包
  loadDrawingManager() {
    // 先加载样式
    const DrawingManager_URL_STYLE = '//api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('href', DrawingManager_URL_STYLE);
    document.head.appendChild(link);

    // 然后加载js
    const DrawingManager_URL = '//api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js';
    const p = new Promise(function (resolve, reject) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.setAttribute('src', DrawingManager_URL);
      script.async = true;

      script.onload = function () {
        resolve();
        script.parentNode.removeChild(script);
      };
      document.head.appendChild(script);

    });
    return p;


  }


}

