import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { VehicleConditionMonitorService } from '../vehicle-condition-monitor.service';
import { EventsService } from '../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public OID: any;
  public ODID: any;
  public KeyWords: string;
  public VehicleStatus: any;
  public _GetRenderList_: any;
  public _download: any;
  // 车辆状态下拉框
  public placeholder = '请选择车辆状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:-1, value: '全部'},
    {ID:8, value:'行驶'},
    {ID:16, value:'停止'},
    {ID:1, value:'离线'}
  ];
  public text: any;
  public isModal: boolean = false;
  constructor(
    private vehicleConditionMonitorService: VehicleConditionMonitorService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {

  }

  // 选择状态
  getStatus(e){
    this.VehicleStatus = e.ID;
  }

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  search(KeyWords) {
    this.rows = [];
    this.query = {
      OID: this.OID,
      ODID: this.ODID,
      VehicleStatus: this.VehicleStatus,
      KeyWords: KeyWords ? KeyWords.trim() : '',
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }


  //  获取所有数据
  getList() {
    this._GetRenderList_ = this.vehicleConditionMonitorService.GetPageCarMonitorVehicles(this.query).subscribe(
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

  // 导出
  download(KeyWords) {
    const data = {
      OID: this.OID || -1,
      ODID: this.ODID || -1,
      VehicleStatus: this.VehicleStatus,
      KeyWords: KeyWords ? KeyWords.trim() : ''
    };
    this.text = '导出中...';
    this.isModal = true;
    this._download = this.vehicleConditionMonitorService.GetPageCarMonitorVehiclesExcel(data).subscribe((res) => {
      const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
      const objectUrl = URL.createObjectURL(blob); 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, '车况监控列表');
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download','车况监控列表');
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

  // 远程检测
  remoteCheck(item): void {
    this.router.navigate(['./remote', item.DeviceID, item.VID], { relativeTo: this.activatedRoute });
  }

  // 销毁
  ngOnDestroy() {
    if (this._GetRenderList_) {
      this._GetRenderList_.unsubscribe();
    }
    if (this._download) {
      this._download.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
