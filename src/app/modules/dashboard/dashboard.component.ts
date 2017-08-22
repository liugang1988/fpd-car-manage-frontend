import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { zoomInRight } from '../../animation/zoomInRight';
import { fadeIn } from '../../animation/fadeIn';

@Component( {
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
  animations: [ zoomInRight , fadeIn]
})
export class DashboardComponent implements OnInit {

  currentUrl: string;

  option: Object;

  tabs: Array<any>;

  constructor( private router: Router ) { }

  ngOnInit() {
    // 设置Tabs数组
    this.tabs = [ {
      name: '车辆概况',
      link: '/page/dashboard/vehicle-overview'
    }, {
      name: '驾驶员管理',
      link: '/page/dashboard/driver-management'
    }
    // , {
    //   name: '车务管理',
    //   link: '/page/dashboard/vehicle-management'
    // }
    ];

    // 获取当前URL
    this.router.events.subscribe(( evt: { url?: string, urlAfterRedirects?: string }) => {
      this.currentUrl = evt.urlAfterRedirects;
    });
  }


}
