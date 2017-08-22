import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { SingleVehicleService } from '../single-vehicle.service';
import { EventsService } from '../../../../../../services/events-service.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  public getDid: any; // 设备ID
  public loading = false; // 控制loading显示
  public panelStatisticsInfo: any; // 面板车辆统计个人信息
  public getRenderData: any;
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private singleVehicleService: SingleVehicleService,
    private eventsService: EventsService
    ) { }

  ngOnInit() {
    this.getRouteDid();
  }


  // 获取DID
  getRouteDid() {
    this.getDid = this.activatedRoute.parent.parent.parent.parent.params.subscribe((params: { Did: string }) => {
      this.GetSingleStatistics(parseInt(params.Did, 10));
    });
  }

  // 获取单个驾驶员信息
  GetSingleStatistics(Did) {
    this.getRenderData = this.singleVehicleService.Statistics(Did).subscribe((res) => {
      this.panelStatisticsInfo = res.Data;
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

  // 跳转页面
  gotoVehicleDetail(panelStatisticsInfo) {
    this.router.navigateByUrl('page/base-data/vehicle-information/detail/' + panelStatisticsInfo.Vid);
  }


  // 销毁
  ngOnDestroy() {
    if (this.getRenderData) {
      this.getRenderData.unsubscribe();
    }
    if (this.getDid) {
      this.getDid.unsubscribe();
    }
  }

}
