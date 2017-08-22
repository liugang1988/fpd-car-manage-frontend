import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductTestService } from '../product-test.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public DeviceDetailInfo: any;
  public getId: any;
  public id: string;
  public _detail:any;
  constructor(
    private productTestService: ProductTestService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.checkAction();
  }

  // 根据id查看详情
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.DeviceDetail({ 'DeviceId': parseInt(params.id, 10) });
      }
    });
  }

  // 设备详情(包含车辆详情)
  DeviceDetail(data) {
    this._detail = this.productTestService.DetailDevice(data).subscribe((res) => {
      if (res.State) {
        this.DeviceDetailInfo = res.Data.DeviceDTO;
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
