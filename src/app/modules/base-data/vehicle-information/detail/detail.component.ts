import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 服务
import { VehicleInformationService } from '../vehicle-information.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit ,OnDestroy{
  public singleVehicleInfo: any;
  public id: number;
  public _detail:any;
  constructor(
    private vehicleInformationService: VehicleInformationService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改还是查看详情
  checkAction() {
    // 路由快照
    this.id = +this.activatedRoute.snapshot.params['id'];
    this.VehicleDetail({ 'Vid': this.id });
  }
  // 获取单个供应商的信息
  VehicleDetail(data) {
    this._detail = this.vehicleInformationService.DetailVehicle(data).subscribe((res) => {
      if (res.State) {
        this.singleVehicleInfo = res.Data;
      }
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

  ngOnDestroy() {
    if(this._detail){
      this._detail.unsubscribe();
    }
  }
}
