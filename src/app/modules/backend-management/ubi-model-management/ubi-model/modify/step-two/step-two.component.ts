import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
// 服务
import { EventsService } from '../../../../../../services/events-service.service';
import { UbiModelService } from '../../ubi-model.service';
@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit, OnDestroy {

  @Input() stepTwoData: any;
  @Output() result = new EventEmitter;
  @Output() transmisstion = new EventEmitter;

  public BehaviorEnable: any = 0; // 驾驶行为计费启用
  public SpeedEnable: any = 0;  // 超速规则启用
  public BehaviorContent: any = [];
  public SpeedContent: any = [];
  public secondObj: any = {};  // 第二步暂存数据

  public BehaviorInputStatus: boolean;  // 驾驶行为状态
  public SpeedInputStatus: boolean; //超速 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private ubiModelService: UbiModelService,
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.stepTwoData.BehaviorContent) {
      this.BehaviorContent = this.stepTwoData.BehaviorContent;
      this.SpeedContent = this.stepTwoData.SpeedContent;
      this.BehaviorEnable = this.stepTwoData.BehaviorEnable;
      this.SpeedEnable = this.stepTwoData.SpeedEnable;
    } else {
      this.getDrivingAction();
      this.getSpeed();
    }
  }

  // 获取驾驶行为列表
  getDrivingAction() {
    this.ubiModelService.DrivingActionEnum().subscribe((res) => {
      if (res.Data) {
        for (let i = 0, j = res.Data.length; i < j; i++) {
          this.BehaviorContent.push({
            Type: res.Data[i].ID,
            Name: res.Data[i].DictionaryValue,
            Price: 0,
            Enabled: 0
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

  // 驾驶行为验证
  BehaviorContentChange(value, index) {
    let pattern = /^(\d*)(\.\d{1,2})?$/;
    if (pattern.test(value)) {
      this.BehaviorContent[index].BehaviorinputType = 1;
    } else {
      this.BehaviorContent[index].BehaviorinputType = 2;
    }
    this.checkBehaviorAll();
  }

  // 验证所有项目
  checkBehaviorAll() {
    for (let i = 0, j = this.BehaviorContent.length; i < j; i++) {
      if (this.BehaviorContent[i].BehaviorinputType && this.BehaviorContent[i].BehaviorinputType == 2) {
        this.BehaviorInputStatus = true;
        return;
      }
      this.BehaviorInputStatus = false;
    }
  }

  // 获取超速行驶列表
  getSpeed() {
    this.ubiModelService.SpeedEnum().subscribe((res) => {
      if (res.Data) {
        for (let i = 0, j = res.Data.length; i < j; i++) {
          this.SpeedContent.push({
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
  SpeedContentChange(value, index) {
    let pattern = /^(\d*)(\.\d{1,2})?$/;
    if (pattern.test(value)) {
      this.SpeedContent[index].SpeedinputType = 1;
    } else {
      this.SpeedContent[index].SpeedinputType = 2;
    }
    this.checkSpeedAll();
  }

  // 验证所有项目
  checkSpeedAll() {
    for (let i = 0, j = this.SpeedContent.length; i < j; i++) {
      if (this.SpeedContent[i].SpeedinputType && this.SpeedContent[i].SpeedinputType == 2) {
        this.SpeedInputStatus = true;
        return;
      }
      this.SpeedInputStatus = false;
    }
  }

  // 上一步
  up() {
    this.secondObj = this.stepTwoData;
    this.secondObj.BehaviorEnable = this.BehaviorEnable ? 1 : 0;
    this.secondObj.BehaviorContent = this.BehaviorContent;
    this.secondObj.SpeedEnable = this.SpeedEnable ? 1 : 0;
    this.secondObj.SpeedContent = this.SpeedContent;
    this.transmisstion.emit(this.secondObj);
    this.result.emit(1);
  }

  // 下一步
  next() {
    this.secondObj = this.stepTwoData;
    this.secondObj.BehaviorEnable = this.BehaviorEnable ? 1 : 0;
    this.secondObj.BehaviorContent = this.BehaviorContent;
    this.secondObj.SpeedEnable = this.SpeedEnable ? 1 : 0;
    this.secondObj.SpeedContent = this.SpeedContent;
    this.transmisstion.emit(this.secondObj);
    this.result.emit(3);
  }

  ngOnDestroy() {
    this.BehaviorContent = [];
    this.SpeedEnable = [];
  }

}
