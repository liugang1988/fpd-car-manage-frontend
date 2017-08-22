import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { SecurityAlertService } from '../security-alert.service';
import { EventsService } from '../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { flyIn } from '../../../../animation/flyIn';
import { bounceIn } from '../../../../animation/bounceIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, flyIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public OID: any;
  public ODID:any;
  public getRenderList: any;
  public showFilterItem = true;
  public ProcessingStatus: any;
  public showEventHandingAlert = false;
  public taskListRouterParam: any;
  public KeyWords: any;
  public AlertsFilter: any;
  public listCount: any;
  // 状态下拉框
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:-1, value: '全部'},
    {ID:0, value:'未处理'},
    {ID:1, value:'已发送'},
    {ID:2, value:'已处理'},
    {ID:3, value:'忽略处理'},
    {ID:4, value:'误报'}
  ];
  public _GetParam_: any;
  public _download: any;
  public text: any;
  public isModal: boolean = false;
  constructor(
    private securityAlertService: SecurityAlertService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.getAlertParam();
  }

  // 获取从警报列表进来的参数
  getAlertParam() {
    this._GetParam_ = this.activatedRoute.queryParams.subscribe((res: { AlertType: string }) => {
      if (res.AlertType) {
        this.AlertsFilter = res.AlertType;
        this.ProcessingStatus = 0;
      }else{
        this.AlertsFilter = '';
        this.ProcessingStatus = -1;
      }
      this.rows = [];
      this.getList();
    },
      (err) => {
        console.log('出错啦！');
      }
    );
  }

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  // 选择状态
  getStatus(e){
    this.ProcessingStatus = e.ID;
  }


  // 查询
  search(KeyWords, ProcessingStatus, AlertsFilter) {
    this.rows = [];
    this.query = {
      OID: this.OID,
      ODID: this.ODID,
      KeyWords: KeyWords ? KeyWords.trim() : '',
      ProcessingStatus: this.ProcessingStatus,
      AlertsFilter: AlertsFilter,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }


  // 获取所有数据
  getList() {
    this.query.AlertsFilter = this.AlertsFilter;
    this.query.ProcessingStatus = this.ProcessingStatus;
    this.getRenderList = this.securityAlertService.GetPageAlertRecordList(this.query).subscribe((res) => {
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
      this.text = '';
      this.isModal = false;
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

  // 导出
  download(KeyWords, ProcessingStatus, AlertsFilter) {
    const data = {
      OID: this.OID || -1,
      ODID: this.ODID || -1,
       KeyWords: KeyWords ? KeyWords.trim() : '',
      ProcessingStatus: this.ProcessingStatus,
      AlertsFilter: AlertsFilter
    };
    this.text = '导出中...';
    this.isModal = true;
    this._download = this.securityAlertService.GetPageAlertRecordListExcel(data).subscribe((res) => {
      const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
      const objectUrl = URL.createObjectURL(blob); 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, '安全报警列表');
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download','安全报警列表');
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

  // 分类筛选显示
  showFilter() {
    this.showFilterItem = !this.showFilterItem;
    this.AlertsFilter = '';
  }

  // 处理
  record(item): void {
    this.showEventHandingAlert = true;
  }

  // 处理背景颜色
  statusColor(item) {
    return {
      'badge-primary': parseInt(item, 10) === 2 ? true : false,
      'badge-success': parseInt(item, 10) === 1 ? true : false,
      'badge-default': parseInt(item, 10) === 3 ? true : false,
      'badge-warning': parseInt(item, 10) === 4 ? true : false,
      'badge-danger': parseInt(item, 10) === 0 ? true : false
    };
  }

  // 关闭弹窗
  closeAlert(e) {
    this.showEventHandingAlert = false;
    if (e) {
      this.rows = [];
      this.list = [];
      this.getList();
    }
  }


  // 销毁
  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    if (this._GetParam_) {
      this._GetParam_.unsubscribe();
    }
    if (this._download){
      this._download.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
