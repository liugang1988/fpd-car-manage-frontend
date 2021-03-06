import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性


// 服务
import { FatigueDrivingService } from '../fatigue-driving.service';
import { EventsService } from '../../../../../services/events-service.service';


// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';


// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public form: FormGroup;
  public UserId: any;
  public _getList_: any;
  public _getServeData_: any;
  public _resetDefault_: any;
  constructor(
    private eventsService: EventsService,
    private fatigueDrivingService: FatigueDrivingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(router, activatedRoute);
    this.form = fb.group({
      'OneContinueHour': ['', Validators.compose([Validators.required, Validators.pattern('(([1-9])|(1\\d)|(2[0-4]))')])],
      'DayContinueHour': ['', Validators.compose([Validators.required, Validators.pattern('(([1-9])|(1\\d)|(2[0-4]))')])]
    }, { validator: this.formatMatch('OneContinueHour', 'DayContinueHour') });
  }


  // 确保单日累计驾驶超过不小于连续驾驶超过
  formatMatch(OneContinueHour, DayContinueHour) {
    return (group: FormGroup) => {
      const OneContinueHourInput = group.controls[OneContinueHour];
      const DayContinueHourInput = group.controls[DayContinueHour];
      if (OneContinueHourInput.value >= DayContinueHourInput.value) {
        return DayContinueHourInput.setErrors({ notEquivalent: true });
      }
    };
  }

  ngOnInit() {
    this.getServeData();
    this.getList();
  }

  // 获取所有数据
  getList(pageIndex?) {
    this.rows = [];
    this.query.PageSize = 5;
    this._getList_ = this.fatigueDrivingService.GetPageTiredFenceLogs(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: pageIndex ? pageIndex : this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
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
      }
    );
  }

  // 获取服务端是否有保存过设置的阀值
  getServeData() {
    this._getServeData_ = this.fatigueDrivingService.GetTiredFenceRuleSetting().subscribe(
      (res) => {
        if (res.State) {
          this.form.setValue({
            'OneContinueHour': res.Data.RuleContent.OneContinueHour || '',
            'DayContinueHour': res.Data.RuleContent.DayContinueHour || ''
          });
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
      }
    );
  }
  onSubmit(form) {
    form.OneContinueHour = parseInt(form.OneContinueHour, 10);
    form.DayContinueHour = parseInt(form.DayContinueHour, 10);
    this.fatigueDrivingService.UpdateTiredFence(form).subscribe(
      (res) => {
        this.getServeData();
        this.getList();
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      },
      (err) => {
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      }
    );
  }

  // 恢复默认版本
  resetDefault() {
    this._resetDefault_ = this.fatigueDrivingService.RecoverTriedFenceFence().subscribe(
      (res) => {
        this.getServeData();
        this.getList();
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      },
      (err) => {
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      }
    );
  }

  // 销毁
  ngOnDestroy() {
    if (this._getList_) {
      this._getList_.unsubscribe();
    }
    if (this._getServeData_) {
      this._getServeData_.unsubscribe();
    }
    if (this._resetDefault_) {
      this._resetDefault_.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }


}
