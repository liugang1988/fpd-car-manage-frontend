import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-single-vehicle',
  templateUrl: './single-vehicle.component.html',
  styleUrls: ['./single-vehicle.component.scss']
})
export class SingleVehicleComponent implements OnInit, OnDestroy {

  public getUrl: any;
  public currentUrl: string;
  public tabs: Array<any>;
  public getDid: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRouteDid();
  }


  // 获取路由DID
  getRouteDid() {
    this.getDid = this.activatedRoute.parent.parent.params.subscribe((params: { Did: string }) => {
      this.IntTab(params.Did);
    });
  }

  // 设置Tab
  IntTab(Did) {
    // tabs数组
    this.tabs = [{
      name: '车辆',
      link: '/page/car-location/control/' + Did + '/single-vehicle/vehicle-info',
      icon: 'fpd-car'
    }, {
      name: '驾驶员',
      link: '/page/car-location/control/' + Did + '/single-vehicle/driver-info',
      icon: 'fpd-yonghu'
    }, {
      name: '车务',
      link: '/page/car-location/control/' + Did + '/single-vehicle/car-service-info',
      icon: 'fpd-wenzhang'
    },
    {
      name: '档案',
      link: '/page/car-location/control/' + Did + '/single-vehicle/statistics-info',
      icon: 'fpd-dangan'
    }];

    // 获取当前URL
    this.getUrl = this.router.events.subscribe((evt: { url?: string, urlAfterRedirects?: string }) => {
      this.currentUrl = evt.urlAfterRedirects;
    });
  }
  ngOnDestroy() {
    if (this.getDid) {
      this.getDid.unsubscribe();
    }
    if (this.getUrl) {
      this.getUrl.unsubscribe();
    }
  }


}
