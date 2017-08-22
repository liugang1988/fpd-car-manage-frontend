import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { SecurityAlertsService } from '../security-alerts.service';
import { EventsService } from '../../../../services/events-service.service';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';


// 表格基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public KeyValue: any;
  public OID: any;
  public ODID: any;
  public Time: any;
  public _getList_: any;
  public _download: any;
  public text: any;
  public isModal: boolean = false;
  constructor(private eventsService: EventsService,
    private securityAlertsService: SecurityAlertsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  ngOnInit() { }

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  search(KeyValue) {
    this.rows = [];
    this.query = {
      KeyValue: KeyValue,
      OID: this.OID,
      ODID: this.ODID,
      Time: this.Time,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }

  getList() {
    this.query.Time = this.Time;
    this._getList_ = this.securityAlertsService.AlertSummary(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.text = '';
        this.isModal = false;
      },
      (err) => {
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
  download(KeyValue) {
    const data = {
      KeyValue: KeyValue || '',
      OID: this.OID || -1,
      ODID: this.ODID || -1,
      Time: this.Time
    }
    this.text = '导出中...';
    this.isModal = true;
    this._download = this.securityAlertsService.AlertSummaryExportExcle(data).subscribe((res) => {
      const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
      const objectUrl = URL.createObjectURL(blob); 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, '安全报警统计报表'+ this.Time);
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download','安全报警统计报表'+ this.Time);
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

  // 修改
  detail(item: any): void {
    this.router.navigate(['./detail', item.VID], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if (this._getList_) {
      this._getList_.unsubscribe();
    }
    if (this._download) {
      this._download.unsubscribe();
    }
  }
}
