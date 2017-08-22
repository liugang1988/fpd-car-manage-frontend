import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 服务
import { SingleVehicleService } from '../single-vehicle.service';
import { EventsService } from '../../../../../../services/events-service.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit, OnDestroy {

  public getDid: any; // 设备ID
  public panelDriverInfo: any; // 面板司机个人信息
  public panelCarStatusInfo: any; // 面板司机违规信息
  public panelCarCountInfo: any; // 面板司机车辆信息

  public loading = false; // 控制loading显示

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


  // 获取Driverid
  getRouteDid() {
    this.getDid = this.activatedRoute.parent.parent.parent.parent.params.subscribe((params: { Did: string }) => {
      this.GetSingleDriver(parseInt(params.Did, 10));
    });
  }


  // 获取单个驾驶员信息
  GetSingleDriver(data) {
    this.getRenderData = this.singleVehicleService.GetSingleDriver(data).subscribe((res) => {
      this.panelDriverInfo = res.Data;
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


  // 销毁
  ngOnDestroy() {
    if (this.getDid) {
      this.getDid.unsubscribe();
    }
    if (this.getRenderData) {
      this.getRenderData.unsubscribe();
    }
  }

}
