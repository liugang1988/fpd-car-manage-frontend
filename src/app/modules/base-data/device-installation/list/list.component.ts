import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { DeviceInstallationService } from '../device-installation.service';
import { EventsService } from '../../../../services/events-service.service';


// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';

import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public showLoading = true;
  public showBindAlert = false;
  public showRecordAlert = false;
  public OID:any; // 组织ID
  public ODID: number; // 部门ID
  public BindStatus:any; // 状态
  public currentItem: any;

  public getRenderList: any;
  public KeyValue: string;
  public _download:any;
  // 安装状态下拉框
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:-1, value: '全部'},
    {ID:1, value:'已安装'},
    {ID:0, value:'未安装'}
  ];

  public text:any;
  public isModal:boolean = false;
  constructor(
    private deviceInstallationService: DeviceInstallationService, 
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

  // 选择状态
  getStatus(e){
    this.BindStatus = e.ID;
  }

  // 搜索
  search(KeyValue) {
    this.rows = [];
    this.query = {
      BindStatus: this.BindStatus,
      KeyValue: KeyValue ? KeyValue.trim() : '',
      OID: this.OID,
      ODID: this.ODID,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }


  // 获取所有数据
  getList(pageIndex?) {
    this.getRenderList = this.deviceInstallationService.GetVehicleList(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: pageIndex ? pageIndex : this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
          this.text = '';
          this.isModal = false;
        }
      },
      (err) => {
        this.text = '';
        this.isModal = false;
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

  导出
  download(KeyValue) {
    const data = {
      KeyValue: KeyValue || '',
      OID: this.OID || -1,
      ODID: this.ODID || -1,
      BindStatus: this.BindStatus
    }
    this.text = '导出中...';
    this.isModal = true;
    this._download = this.deviceInstallationService.DeviceInstallExportExcel(data).subscribe((res) => {
      const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
      const objectUrl = URL.createObjectURL(blob); 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, '设备安装列表');
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download','设备安装列表');
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

  // 绑定或解绑
  bind(item) {
    if (item.BindStatus) {
      // 显示解绑弹窗
      this.currentItem = item;
    } else {
      // 显示绑定弹窗
      this.currentItem = item;
      this.showBindAlert = true;
    }
  }

  // 记录
  record(item) {
    this.currentItem = item;
    this.showRecordAlert = true;
  }


  // 关闭记录弹窗
  closeRecordAlert(e) {
    this.showRecordAlert = false;
  }

  // 关闭绑定弹窗
  closeBindAlert(e) {
    this.showBindAlert = false;
    if (e && e.state) {
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
    if(this._download){
      this._download.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
