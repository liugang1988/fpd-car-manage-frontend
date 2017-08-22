import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { UserRegisterManageService } from '../user-register-manage.service';
import { EventsService } from '../../../../../services/events-service.service';

import { fadeIn } from '../../../../../animation/fadeIn';

@Component({
  selector: 'app-dispose',
  templateUrl: './dispose.component.html',
  styleUrls: ['./dispose.component.scss'],
  animations: [fadeIn]
})
export class DisposeComponent implements OnInit, OnDestroy {
  @Input() item: any;
  @Output() showDispose = new EventEmitter();  // 用于向父级发送弹窗关闭事件
  public infor: any;
  public _getDetail: any;
  constructor(
    private eventsService: EventsService,
    private userRegisterManageService: UserRegisterManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.getDetail({
      ID: this.item.ID
    })
  }

  getDetail(data){
    this._getDetail = this.userRegisterManageService.DealCollectUserResult(data).subscribe((res)=>{
      if(res.State){
        this.infor = res.Data;
      }
    }, (err)=>{
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    })
  }

  saveHandler(e) {
    this.showDispose.emit(null);
  }

  closeHandler(e){
    this.showDispose.emit(null);
  }

  // 销毁
  ngOnDestroy() {
    if(this._getDetail){
      this._getDetail.unsubscribe();
    }
  }

}
