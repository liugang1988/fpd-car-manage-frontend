import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

// 服务
import { VehicleRecordManageService } from '../vehicle-record-manage.service';
import { EventsService } from '../../../../../services/events-service.service';

// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public KeyValue: any; // 搜索关键字
  public OID: any;  // 公司id
  public ODID: any; // 部门id
  public defaultValue: any; // 部门默认值
  public _getList: any;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private vehicleRecordManageService: VehicleRecordManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  // 选择公司
  selectOrganization(e) {
    this.OID = e;
    this.ODID = -1;
  }

  // 选择部门
  selectDept(e) {
    this.ODID = e;
  }

  search(KeyValue) {
    this.rows = [];
    this.query = {
      OID: this.OID,
      ODID: this.ODID,
      KeyValue: KeyValue,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.isModal = true;
    this.text = '查询中...';
  }

  getList() {
    this._getList = this.vehicleRecordManageService.VehicleList(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.isModal = false;
        this.text = '';
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
        this.isModal = false;
        this.text = '';
      }
    );
  }

  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if (this._getList) {
      this._getList.unsubscribe();
    }
  }
}

