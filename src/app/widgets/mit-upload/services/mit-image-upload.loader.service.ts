import { Injectable } from '@angular/core';

@Injectable()
export class MitImageUploadLoaderService {

  constructor() { }


  load(): Promise<any> {
    const LRZ_URL = 'http://oo1anb2ny.bkt.clouddn.com/lrz.bundle.js';
    const p = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.setAttribute('src', LRZ_URL);
        script.onload = resolve;
        script.async = true;
        document.head.appendChild(script);
    });
    return p;
  }



}

