import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { LoginLogService } from '../login-log.service';
import { EventsService } from '../../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

// 表格基类
import { MitDataTableBase } from './../../../../../widgets/mit-data-table/mit-data-table-base';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public OID: any;
  public ODID: any;
  public KeyValue: any;
  public logStatus: any;
  public _getList: any;
  public text: any;
  public isModal: boolean = false;
  // 状态下拉
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID: 1, value: 'pc'},
    {ID: 2, value: 'IOS'},
    {ID: 3, value: 'Android'}
  ];
  constructor(
    private loginLogService: LoginLogService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  // 获取状态
  getStatus(e){
    this.logStatus = e.ID;
  }

  // 搜索
  search(KeyValue) {
    this.rows = [];
    this.query = {
      OID: this.OID,
      ODID: this.ODID,
      ClientType: this.logStatus,
      KeyValue: KeyValue,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.isModal = true;
    this.text = '查询中...';
  }

  // 获取所有数据
  getList() {
    this._getList = this.loginLogService.GetLoadingLogs(this.query).subscribe((res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.text = '';
        this.isModal = false;
      },(err) => {
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
      }
    );
  }

  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if( this._getList ){
       this._getList.unsubscribe();
    }
  }
}
