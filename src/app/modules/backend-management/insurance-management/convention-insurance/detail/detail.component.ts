import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 动画
import { fadeIn } from '../../../../../animation/fadeIn';

// 服务
import { ConventionInsuranceService } from '../convention-insurance.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn]
})
export class DetailComponent implements OnInit ,OnDestroy{
  public getId:any; // 获取ID
  public detail:any; // 常规保险详情
  public _detail:any;
  constructor(
    private eventsService: EventsService,
    private conventionInsuranceService: ConventionInsuranceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkAction();
  }

  // 获取ID
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.getDetail({CINo : params.id});
      }
    });
  }

  getDetail(data) {
    this._detail = this.conventionInsuranceService.GetCommonInsuranceDetail(data).subscribe((res) => {
        if (res.State) {
          this.detail = res.Data;
        }
      },(err) => {
       if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
      }
    );
  }

  // 销毁
  ngOnDestroy(){
    if(this.getId){
      this.getId.unsubscribe();
    }
    if(this._detail){
      this._detail.unsubscribe();
    }
  }

}
