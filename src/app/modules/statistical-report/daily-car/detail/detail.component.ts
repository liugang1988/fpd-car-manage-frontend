import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { DailyCarService } from '../daily-car.service';
import { EventsService } from '../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';

// 表格基类
import { MitDataTableBase } from './../../../../widgets/mit-data-table/mit-data-table-base';

// 管道
import { TransDatePipe } from '../../../../widgets/mit-pipe/TransDate/trans-date.pipe';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class DetailComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public singleRenderInfo: any;
  public Time: any;
  public OID: any;
  public ODID: any;
  public Plate: any;
  public IsOut: any = 1;
  public departmentName:any;
  public _getList: any;
  public _SingleRender: any;
  public _download:any;
  // 状态下拉
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    { ID: 2, value: '未出行' },
    { ID: 1, value: '出行' }
  ];
  public text: any;
  public isModal: boolean = false;
  constructor(
    private dailyCarService: DailyCarService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: { date: string, odid: string }) => {
      this.ODID = parseInt(params.odid, 10);
      this.Time = new TransDatePipe().transform(params.date);
      this.getSingleRenderInfo();
    });

  }

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  // 获取状态
  getStatus(e) {
    this.IsOut = e == -1 ? e : e.ID;
  }

  search(Time, Plate) {
    this.rows = [];
    this.query = {
      Time: new TransDatePipe().transform(Time),
      OID: this.OID || -1,
      ODID: this.ODID,
      Plate: Plate,
      IsOut: this.IsOut,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.getSingleRenderInfo();
    this.text = '查询中...';
    this.isModal = true;
  }

  getSingleRenderInfo() {
    const data = {
      Time: new TransDatePipe().transform(this.Time),
      OID: this.OID || -1,
      ODID: this.ODID || -1
    };
    this._SingleRender = this.dailyCarService.SingleVehicleMileageAndOilSummaryForDay(data).subscribe((res) => {
        if (res.State) {
          this.singleRenderInfo = res.Data;
          this.departmentName = res.Data.OrganizeName + '/' + res.Data.DepartmentName;
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
      }
    );
  }


  // 获取所有数据
  getList() {
    this.query.Time = new TransDatePipe().transform(this.Time);
    this.query.ODID = this.ODID || -1;
    this.query.IsOut = this.IsOut;
    this.rows = [];
    this._getList = this.dailyCarService.VehicleMileageAndOilSummaryListForDay(this.query).subscribe((res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.text = '';
        this.isModal = false;
      }, (err) => {
        if (err.State == 10 || err.State == 11 || err.State == 12) {
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(() => {
            this.router.navigate(['/account/login']);
          }, 2500)
        } else {
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
        this.text = '';
        this.isModal = false;
      }
    );
  }

  // 导出
  download(Time, Plate) {
    const data = {
      Plate: Plate || '',
      OID: this.OID || -1,
      ODID: this.ODID || -1,
      IsOut: this.IsOut,
      Time: new TransDatePipe().transform(Time)
    }
    const time = this.Time.year + '-' + this.Time.month + '-' + this.Time.day;  
    this.text = '导出中...';
    this.isModal = true;
    this._download = this.dailyCarService.VehicleMileageAndOilSummaryForDayExport(data).subscribe((res) => {
      const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
      const objectUrl = URL.createObjectURL(blob); 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, '每日出车详情报表' + time);
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download','每日出车详情报表' + time);
        a.click();
        URL.revokeObjectURL(objectUrl);
      }
      this.text = '';
      this.isModal = false;
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
      this.text = '';
      this.isModal = false;
    });
  }


  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if (this._getList) {
      this._getList.unsubscribe();
    }
    if (this._SingleRender) {
      this._SingleRender.unsubscribe();
    }
  }

}
