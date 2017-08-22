import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 动画
import { flyIn } from '../../../../animation/flyIn';
import { fadeIn } from '../../../../animation/fadeIn';

// 服务
import { SecurityAlertService } from '../security-alert.service';
import { EventsService } from '../../../../services/events-service.service';
@Component({
  selector: 'app-event-handing',
  templateUrl: './event-handing.component.html',
  styleUrls: ['./event-handing.component.scss'],
  animations: [fadeIn, flyIn]
})
export class EventHandingComponent implements OnInit, OnDestroy {


  @Input() item: any;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件
  public NotifyForm: FormGroup; // 表单对象

  public SelfForm: FormGroup; // 自行处理
  public radio = 1; // 用户选择处理类型

  public HandlerResult: number;
  public Operator: any;
  public getRenderUserList: any;
  // 用户处理方式面板
  public radioGroup = [{
    id: 1,
    name: '自行处理',
    checked: true
  }, {
    id: 2,
    name: '通知其他人',
    checked: false
  }];

  // 通知其他人
  public notifyWay = [{
    id: 1,
    name: '手机短信',
    checked: true
  }, {
    id: 2,
    name: '邮件',
    checked: false
  }];

  constructor(
    private securityAlertService: SecurityAlertService,
    private eventsService: EventsService,
    private router: Router,
    public fb: FormBuilder
  ) {

  }

  ngOnInit() {

    // 自行处理表单

    this.SelfForm = this.fb.group({
      AID: this.item.ID,
      ProcessingStatus: 2,
      Memo: ['', Validators.compose([Validators.required, Validators.maxLength(200)])]
    });


    // 通知表单
    this.NotifyForm = this.fb.group({
      AID: this.item.ID,
      NoticeType: [1, Validators.required],
      DestUserId: [0, Validators.required],
      ProcessingStatus: 1,
      Phone: ['', Validators.compose([Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}')])],
      Email: ['', Validators.compose([Validators.pattern('[\\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+')])],
      Memo: ['', Validators.compose([Validators.required, Validators.maxLength(200)])]
    });
  }


  filterData(Operator, ID) {
    if (ID) {
      Operator.forEach((item) => {
        if (item.ID === parseInt(ID, 10)) {
          this.NotifyForm.controls['Phone'].setValue(item.UserPhone);
          this.NotifyForm.controls['Email'].setValue(item.UserEmail);
        };
      });
    }
  }

  setProcessingStatus(id) {
    this.SelfForm.controls['ProcessingStatus'].setValue(id);
  }


  // 行为判断
  checkAtion(e) {
    if (this.radio === 2) {
      this.getUserList();
    }
  }

  // 获取用户列表
  getUserList() {
    if (!this.Operator) {
      this.getRenderUserList = this.securityAlertService.GetUserList().subscribe(
        (res) => {
          if (res.State) {
            this.Operator = res.Data;
          }
        },
        (err) => {
          
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
  }

  // 通知方式
  notifyHandler(array) {
    const _r = array.filter((e) => { return e.checked; });
    if (_r.length >= 2) {
      this.NotifyForm.controls['NoticeType'].setValue(3);
    } else if (_r.length) {
      this.NotifyForm.controls['NoticeType'].setValue(_r[0].id);
    } else {
      this.NotifyForm.controls['NoticeType'].setValue(0);
    }
  }


  // 保存
  saveHandler(NotifyForm, SelfForm) {
    if (this.radio === 1) {
      this.ProcessAlarmBySelf(SelfForm);
    } else {
      NotifyForm.DestUserId = parseInt(NotifyForm.DestUserId, 10);
      this.ProcessAlarmByNotice(NotifyForm);
    }
  }

  // 自行处理
  ProcessAlarmBySelf(data) {
    this.securityAlertService.ProcessAlarmBySelf(data).subscribe((res) => {
      this.close.emit(data);
      this.eventsService.emitMessageEvent(this.eventsService.getNames().EVENT_SECURITY_ALERT_HANDING, res);
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
    }, (err) => {
      this.close.emit(null);
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }


  //  通知他人
  ProcessAlarmByNotice(data) {
    this.securityAlertService.ProcessAlarmByNotice(data).subscribe((res) => {
      this.close.emit(data);
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
    }, (err) => {
      this.close.emit(null);
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }

  closeHandler(e) {
    this.close.emit(null);
  }


  ngOnDestroy() {
    if (this.getRenderUserList) {
      this.getRenderUserList.unsubscribe();
    }
  }


}
