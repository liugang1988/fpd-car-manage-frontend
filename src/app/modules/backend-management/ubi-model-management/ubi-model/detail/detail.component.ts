import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { UbiModelService } from '../ubi-model.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public ModelData: any;  // 保存数据
  public modelId: number; // 模型id
  public getId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private ubiModelService: UbiModelService
  ) { }

  ngOnInit() {
    this.checkParams();
  }

  // 检查是否有传模型id过来
  checkParams() {
    this.getId = this.activatedRoute.params.subscribe((params: {ID: string}) => {
      if ( params.ID ) {
        this.modelId = parseInt(params.ID);
        this.getUBIModelInfo({ ID: this.modelId });
      }
    });
  }

  // 根据模型id，获取模型详细信息
  getUBIModelInfo(data) {
    this.ubiModelService.GetModelDetail(data).subscribe((res) => {
      if ( res.Data ) {
        this.ModelData = res.Data;
      }
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    });
  }

  // 返回
  back() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  // 销毁
  ngOnDestroy() {
    if ( this.getId ) {
      this.getId.unsubscribe();
    }
  }

}
