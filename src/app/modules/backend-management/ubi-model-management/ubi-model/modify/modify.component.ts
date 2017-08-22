import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { UbiModelService } from '../ubi-model.service';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit, OnDestroy {
  public step: number = 1;  // 默认哪一步
  public id: number;  // 存放模型id
  public getId: any;
  public modelData: any = {};  // 存放所有新增模型的数据集
  public _getModelInfo:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private ubiModelService: UbiModelService
  ) { }

  // 初始化生命周期
  ngOnInit() {
    this.checkAction();
  }

  // 获取id
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: {ID: string}) => {
      if ( params.ID ) {
        this.id = parseInt(params.ID);
        this.getModelInfo({ID: this.id});
      }else{
        this.modelData = {};
      }
    });
  }

  // 获取模型详细
  getModelInfo(data) {
    this.modelData = {};
    this._getModelInfo = this.ubiModelService.GetModelDetail(data).subscribe((res) => {
      if ( res.Data ) {
        this.modelData = res.Data;
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

  // 控制步骤显示
  setStepShow(e) {
    this.step = e;
  }

  // 保存第一步返回来的数据
  setStepOneData(e) {
    this.modelData= e;
  }

  // 保存第二步返回来的数据
  setStepTwoData(e) {
    this.modelData = e;
  }

  // 保存第三步返回来的数据
  setStepThreeData(e) {
    this.modelData = e;
  }

  // 销毁 生命周期
  ngOnDestroy() {
    if ( this.getId ) {
      this.getId.unsubscribe();
    }
    if(this._getModelInfo){
      this._getModelInfo.unsubscribe();
    }
  }

}
