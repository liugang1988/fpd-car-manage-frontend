import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { GuaranteeManagementService } from '../guarantee-management.service';
import { EventsService } from '../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn]
})
export class DetailComponent implements OnInit {
  public id:any;
  public getId:any;
  public insuranceDetail:any;
  public _insuranceDetail:any;
  constructor(
    private eventsService: EventsService,
    private guaranteeManagementService: GuaranteeManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkAction();
  }

  // 获取ID
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { ID: string }) => {
      if (params.ID) {
        this.id = parseInt(params.ID, 10);
        this.getDetail({ ID: this.id });
      }
    });
  }
  
  // 获取详情
  getDetail(data){
    this._insuranceDetail = this.guaranteeManagementService.GetUBIInsuranceDetail(data).subscribe((res)=>{
      if(res.Data){
        this.insuranceDetail = res.Data;
      }
    },(err)=>{
      if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    })
  }

  // 销毁
  ngOnDestroy() {
    if(this._insuranceDetail){
      this._insuranceDetail.unsubscribe();
    }
    if(this.getId){
      this.getId.unsubscribe();
    }
  }

}
