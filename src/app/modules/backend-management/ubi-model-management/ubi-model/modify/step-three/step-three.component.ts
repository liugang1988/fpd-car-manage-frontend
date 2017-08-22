import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
// 服务
import { EventsService } from '../../../../../../services/events-service.service';
import { UbiModelService } from '../../ubi-model.service';
@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit, OnChanges, OnDestroy {

  @Input() stepData: any;
  @Output() result = new EventEmitter;
  @Output() transmission = new EventEmitter;
  public id: any;
  public getId: any;
  // 保单计费系数，出险
  public AccidentContent: any = [];
  public AccidentEnable: number = 0;

  public threeObj: any = {};  // 第三步数据
  public showLoading: boolean = false;  // 提交进度

  public AccidentInputStatus: boolean;  // 出险状态
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private ubiModelService: UbiModelService
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.stepData.AccidentContent) {
      this.AccidentContent = this.stepData.AccidentContent;
      this.AccidentEnable = this.stepData.AccidentEnable;
    } else {
      this.getNearYearCompensate();
    }
    this.checkAction();
  }

  // 获取id
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { ID: string }) => {
      if (params.ID) {
        this.id = parseInt(params.ID);
      }
    });
  }

  // 获取出险次数列表
  getNearYearCompensate() {
    this.ubiModelService.NearYearCompensateEnum().subscribe((res) => {
      if (res.Data) {
        for (let i = 0, j = res.Data.length; i < j; i++) {
          this.AccidentContent.push({
            ID: res.Data[i].ID,
            Name: res.Data[i].DictionaryValue,
            Coefficient: 0
          });
        }
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
    })
  }

  // 超速验证
  AccidentContentChange(value, index) {
    let pattern = /^(\d*)(\.\d{1,2})?$/;
    if (pattern.test(value)) {
      this.AccidentContent[index].AccidentinputType = 1;
    } else {
      this.AccidentContent[index].AccidentinputType = 2;
    }
    this.checkAccidentAll();
  }

  // 验证所有项目
  checkAccidentAll() {
    for (let i = 0, j = this.AccidentContent.length; i < j; i++) {
      if (this.AccidentContent[i].AccidentinputType && this.AccidentContent[i].AccidentinputType == 2) {
        this.AccidentInputStatus = true;
        return;
      }
      this.AccidentInputStatus = false;
    }
  }

  // 提交
  submit() {
    if (!this.showLoading) {
      this.threeObj = this.stepData;
      this.threeObj.AccidentEnable = this.AccidentEnable ? 1 : 0;
      this.threeObj.AccidentContent = this.AccidentContent;
      this.showLoading = true;
      if (this.id) {
        // 更新
        this.ubiModelService.UpdateModel(this.threeObj).subscribe((res) => {
          this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
          this.back();
          this.showLoading = false;
        }, (err) => {
          this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          this.back();
          this.showLoading = false;
        });
      } else {
        // 新增
        this.ubiModelService.AddModel(this.threeObj).subscribe((res) => {
          this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
          this.back();
          this.showLoading = false;
        }, (err) => {
          this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          this.back();
          this.showLoading = false;
        });
      }
    }

  }

  up() {
    this.threeObj = this.stepData;
    this.threeObj.AccidentEnable = this.AccidentEnable ? 1 : 0;
    this.threeObj.AccidentContent = this.AccidentContent;
    this.transmission.emit(this.threeObj);
    this.result.emit(2);
  }

  // 返回列表
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  ngOnDestroy() {
    this.threeObj = {};
    this.AccidentContent = [];
  }

}
