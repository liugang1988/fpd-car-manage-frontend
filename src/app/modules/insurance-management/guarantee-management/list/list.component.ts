import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { GuaranteeManagementService } from '../guarantee-management.service';
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
  public CINo: any; // 搜索保单号
  public KeyValue: any; // 搜索关键字
  public OID: any;  // 公司id
  public ODID: any; // 部门id
  public defaultValue: any; // 部门默认值
  public _getList:any;

  public text: any;
  public isModal: boolean = false;
  constructor(private eventsService: EventsService,
    private guaranteeManagementService: GuaranteeManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  ngOnInit() {

  }

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  search(KeyValue) {
    this.rows = [];
    this.query = {
      OID: this.OID,
      ODID: this.ODID,
      CINo: this.CINo,
      KeyValue: KeyValue,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }

  getList() {
    this._getList = this.guaranteeManagementService.GetGuaranteeList(this.query).subscribe((res) => {
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

  ngOnDestroy() {
    if (this._getList) {
      this._getList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }
}
