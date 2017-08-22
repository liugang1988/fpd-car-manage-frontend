import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性

// 服务
import { ReportExportService } from './report-export.service';
import { EventsService } from '../../../services/events-service.service';

// 管道
import { TransDatePipe } from '../../../widgets/mit-pipe/TransDate/trans-date.pipe';

@Component({
  selector: 'app-report-export',
  templateUrl: './report-export.component.html',
  styleUrls: ['./report-export.component.scss']
})
export class ReportExportComponent implements OnInit, OnDestroy {
  public reportList = [     // 常规报表数据
    //{ ID: 1, name: '租赁企业车辆周报' },
    { ID: 2, name: '租赁企业车辆月报' }
  ];
  public OID: any; // 公司id
  public ODID: any;  // 部门id
  public form: FormGroup; // 表单对象
  public reportStatus: boolean = false;
  public reportID: any;
  public startTime: any;
  public endTime: any;
  public _export: any;
  public showLoading: boolean = false;
  public minDate: object;
  public maxDate: object;
  public currentDate: object;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private reportExportService: ReportExportService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _el: ElementRef
  ) {
    this.form = fb.group({
      'OID': [null, Validators.required],
      'ODID': [null, Validators.required],
      'StartTime': ['', Validators.required],
      'EndTime': ['', Validators.required],
      'type': ['', Validators.required]
    });
  }

  ngOnInit() {
    const today = new Date();
    this.currentDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }

  // 常规报表必须选中
  check(ID) {
    this.reportID = ID;
  }

  // 选择公司
  selectOrganization(e) {
    this.OID = e;
    this.ODID = -1;
    this.form.controls['OID'].setValue(e);
    this.form.controls['ODID'].setValue(-1);
  }

  // 选择部门
  selectDept(e) {
    this.ODID = e;
    this.form.controls['ODID'].setValue(e);
  }

  // 判断常规报表时间
  getTime(ID) {
    let date = new Date();
    let year = +date.getFullYear();
    let month = +date.getMonth();
    let day = date.getDate();
    let beforeMonthDate = new Date(year ,  month , 0);
    let week = date.getDay();
    if (ID === 1) { // 周
      this.startTime = year + '-' + (month + 1) + '-' + ((day - week + 1) < 9 ? '0' + (day - week + 1) : (day - week + 1));
      this.endTime = year + '-' + (month + 1) + '-' + (day < 9 ? '0' + day : day);
    } else if (ID === 2) { // 月,传上个月的1号到最后一天
      this.startTime = year + '-' + month + '-' + '01';
      this.endTime = year + '-' + month + '-' + beforeMonthDate.getDate();
    }
  }

  // 常规报表导出
  export() {
    this.startTime = '';
    this.endTime = '';
    this.getTime(this.reportID);
    const data = {
      StartTime: this.startTime,
      EndTime: this.endTime
    }
    this.submit(data);
  }

  submit(data) {
    if (!this.showLoading) {
      this.isModal = true;
      this.text = '导出中...';
      this.showLoading = true;
      this._export = this.reportExportService.TrackInfoForLease(data).subscribe((res) => {
        var blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        var objectUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        if (data.type) {
          a.setAttribute('download', '行车数据报表' + this.startTime + '至' + this.endTime);
        } else {
          a.setAttribute('download', '租赁企业车辆月报' + this.startTime + '至' + this.endTime);
        }
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.showLoading = false;
        this.isModal = false;
        this.text = '';
      }, (err) => {
        this.showLoading = false;
        if (err.State == 10 || err.State == 11 || err.State == 12) {
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(() => {
            this.router.navigate(['/account/login']);
          }, 2500)
        } else {
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
        this.isModal = false;
        this.text = '';
      })
    }
  }

  // 确认
  onSubmit(form) {
    this.startTime = form.StartTime.year + '-' + form.StartTime.month + '-' + (form.StartTime.day < 9 ? '0' + form.StartTime.day : form.StartTime.day);
    this.endTime = '' + form.EndTime.year + '-' + form.EndTime.month + '-' + (form.EndTime.day < 9 ? '0' + form.EndTime.day : form.EndTime.day);
    form.StartTime = new TransDatePipe().transform(form.StartTime);
    form.EndTime = new TransDatePipe().transform(form.EndTime);
    this.submit(form);
  }

  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      const today = new Date();
      const time = new Date(new TransDatePipe().transform(this.form.controls['StartTime'].value));
      const minSeconds = time.getTime() ; 
      const minTime = new Date(minSeconds);
      if ((minTime.getMonth() == today.getMonth()) && (minTime.getDate() > today.getDate())) {
        this.minDate = { year: minTime.getFullYear(), month: minTime.getMonth() + 1, day: today.getDate() };
      } else {
        this.minDate = { year: minTime.getFullYear(), month: minTime.getMonth() + 1, day: minTime.getDate() };
      }
      const maxSeconds = time.getTime() + 6 * 24 * 60 * 60 * 1000;
      const maxTime = new Date(maxSeconds);

      if ((maxTime.getMonth() == today.getMonth()) && maxTime.getDate() > today.getDate()) {
        this.maxDate = { year: maxTime.getFullYear(), month: maxTime.getMonth() + 1, day: today.getDate() };
      } else {
        this.maxDate = { year: maxTime.getFullYear(), month: maxTime.getMonth() + 1, day: maxTime.getDate() };
      }
    }
  }

  ngOnDestroy() {
    if (this._export) {
      this._export.unsubscribe();
    }
  }
}
