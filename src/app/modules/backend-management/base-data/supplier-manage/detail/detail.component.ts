import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../../services/events-service.service';


// 服务
import { SupplierManageService } from '../supplier-manage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public singleSupplierInfo: any;
  public id: string;
  constructor(
    private supplierManageService: SupplierManageService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改还是查看详情
  checkAction() {
    this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.GetSingleSupplier({ 'SupplierId': parseInt(params.id, 10) });
      }
    });
  }
  // 获取单个供应商的信息
  GetSingleSupplier(data) {
    this.supplierManageService.GetSingleSupplier(data).subscribe((res) => {
      if (res.State) {
        this.singleSupplierInfo = res.Data;
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

  // 返回
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }
}
