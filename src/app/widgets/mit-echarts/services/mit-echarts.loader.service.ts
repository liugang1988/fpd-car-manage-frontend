import { Injectable } from '@angular/core';

@Injectable()
export class MitEchartsLoaderService {

  constructor() { }


  load(): Promise<any> {
    const EChart_URL = '//cdn.bootcss.com/echarts/3.4.0/echarts.min.js';
    const p = new Promise(( resolve, reject ) => {
      const script = document.createElement( 'script' );
      script.type = 'text/javascript';
      script.setAttribute( 'src', EChart_URL );
      script.onload = resolve;
      script.async = true;
      document.head.appendChild( script );
    });
    return p;
  }



}

