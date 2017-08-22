import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 服务
import { SingleVehicleService } from '../single-vehicle.service';
import { MitBaiduMapService } from '../../../../../../widgets/mit-baidu-map/services/mit-baidu-map.service';
import { EventsService } from '../../../../../../services/events-service.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {

  public getDid: any; // 设备ID
  public panelInfo: any; // 面板的信息

  public loading = false; // 控制loading显示
  public phyAddress: any; // 物理地址
  public timeout: any; // 计时器

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private singleVehicleService: SingleVehicleService,
    private bmapService: MitBaiduMapService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getRouteDid();
  }


  // 获取Did
  getRouteDid() {
    this.getDid = this.activatedRoute.parent.parent.parent.parent.params.subscribe((params: { Did: string }) => {
      this.VehiclePositionInfo(parseInt(params.Did, 10));
    });
  }


  // 获取实况信息
  VehiclePositionInfo(Did) {
    this.singleVehicleService.VehiclePositionInfo(Did).subscribe((res) => {
      this.panelInfo = res.Data;
      this.addressTs(this.panelInfo);
      this.loading = false;

      this.timeout = setTimeout(() => {
        this.VehiclePositionInfo(Did);
      }, 10000);

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

  // 经纬度转换物理地址
  addressTs(panelInfo) {
    this.bmapService.getAddress(panelInfo.Lat, panelInfo.Lng).subscribe((res) => {
      this.panelInfo.address = res.result.formatted_address + res.result.sematic_description;
    });
  }


  // 销毁
  ngOnDestroy() {
    if (this.getDid) {
      this.getDid.unsubscribe();
    }
    clearTimeout(this.timeout);
  }

}
