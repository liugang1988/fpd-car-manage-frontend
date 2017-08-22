import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
// 服务
import { EventsService } from '../../../../../../services/events-service.service';
import { UbiModelService } from '../../ubi-model.service';
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit, OnChanges, OnDestroy {
  @Input() stepOneData: any;  // 保存信息
  @Output() result = new EventEmitter;  // 步骤显示发送
  @Output() transmisstion = new EventEmitter;  // 数据发送

  public getId: any;
  public id: any;
  public Content: any = [];
  public form: FormGroup; // 表单对象
  public insuranceProject: any = {};  // 打算用来存储值
  public modelNameStatus: boolean = true; // 模板名称是否存在状态
  public modelNameMsg: any;  // 模板名称存在提示语

  public modelName: any;  // 保存修改的模型名称

  public inputStatus: any; // 输入框状态

  constructor(
    private fb: FormBuilder,
    private ubiModelService: UbiModelService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = fb.group({
      ModelName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      MileagePerYear: [null, Validators.compose([Validators.required, Validators.pattern('^(\\d*)(\.\\d{1,2})?$')])],
      StaticHourPerDay: [null, Validators.compose([Validators.required, Validators.pattern('^([0-9]|1[0-9]|2[0-3])(\.[0-9])?$')])],
      DiscountRate: [null, Validators.compose([Validators.required, Validators.pattern('^(\\d*)(\.\\d{1,2})?$')])]
    });
  }

  ngOnInit() {
    this.checkAction();
  }

  // 获取id
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { ID: string }) => {
      if (params.ID) {
        this.id = parseInt(params.ID);
      } else if (!this.stepOneData.Content) {
        this.getProjectPercent();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // 当存在原始数据时，加载原始数据
    if (this.stepOneData.Content) {
      // 设置表单值
      this.form.setValue({
        ModelName: this.stepOneData.ModelName || '',
        MileagePerYear: this.stepOneData.MileagePerYear || '',
        StaticHourPerDay: this.stepOneData.StaticHourPerDay || '',
        DiscountRate: this.stepOneData.DiscountRate || ''
      });
      this.Content = this.stepOneData.Content;
      this.modelName = this.stepOneData.ModelName;
    }
  }

  // 检查模型名是否唯一
  checkModelName(value) {
    if (value) {
      if (this.id) {
        if (value != this.modelName) {
          this.check(value);
        }
      } else {
        this.check(value);
      }
    }
  }

  check(value) {
    const data = {
      KeyValue: value
    }
    this.ubiModelService.CheckModelNameExisted(data).subscribe((res) => {
      if (res.State) {
        this.modelNameMsg = '';
        this.modelNameStatus = true;
      } else {
        this.modelNameMsg = res.Message;
        this.modelNameStatus = false;
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

  // 获取动静态保险项目占比
  getProjectPercent() {
    this.ubiModelService.AllInsuranceItemList().subscribe((res) => {
      if (res.Data) {
        for (let i = 0, j = res.Data.length; i < j; i++) {
          this.Content.push({
            ID: res.Data[i].ID,
            Name: res.Data[i].ItemName,
            StaticProportion: 0,
            MoveMileageProportion: 50,
            MoveTimeProportion: 50
          })
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
    });
  }

  // 更改动静态计费变动原则
  countCostPercentChange(value, index) {
    // 小数点后一位
    let pattern = /^(([0-9]|[1-9][0-9])(\.\d{1,2})?|100)$/;
    if (pattern.test(value)) {
      let percent = (100 - parseFloat(value)) / 2;
      // 设置动态、静态值
      this.Content[index].MoveMileageProportion = percent;
      this.Content[index].MoveTimeProportion = percent;
      this.Content[index].inputType = 1;
    }else{
      this.Content[index].inputType = 2;
    }
    this.checkAll();
  }

  // 验证所有项目
  checkAll(){
    for(let i=0, j= this.Content.length; i < j; i++){
      if(this.Content[i].inputType && this.Content[i].inputType == 2){
        this.inputStatus = true;
        return;
      }
      this.inputStatus = false;
    }
  }

  // 下一步
  onSubmit(form) {
    // 把数据发送给父组件，且跳转到下一步
    this.insuranceProject = this.stepOneData;
    this.insuranceProject.ModelName = form.ModelName;
    this.insuranceProject.MileagePerYear = form.MileagePerYear;
    this.insuranceProject.StaticHourPerDay = form.StaticHourPerDay;
    this.insuranceProject.DiscountRate = form.DiscountRate;
    this.insuranceProject.Content = this.Content;
    // 发送
    this.transmisstion.emit(this.insuranceProject);
    this.result.emit(2);
  }

  // 销毁
  ngOnDestroy() {
    this.insuranceProject = {};
    this.Content = [];
  }

}
