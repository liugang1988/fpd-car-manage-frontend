import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { VehicleInstallService } from '../vehicle-install.service';
import { EventsService } from '../../../../../services/events-service.service';


// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

// 管道
import { TransDatePipe } from '../../../../../widgets/mit-pipe/TransDate/trans-date.pipe';

import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})

export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public BindStatus: any;
  public currentItem: any; // 需要删除的元素
  public currentDate: any;
  public OID: any;
  public ODID: any;

  public showBindAlert = false;
  public showUnBindAlert = false;
  public showRecordAlert = false;
  public startTime: any;
  public endTime: any;
  public KeyValue: any;
  public getRenderList: any;
  public supplierID: any;
  public DeviceModelID: any;
  // 安装状态下拉框
  public placeholder = '请选择安装状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:-1, value: '全部'},
    {ID:1, value: '已安装'},
    {ID:0, value: '未安装'}
  ];


  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private vehicleInstallService: VehicleInstallService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    const today = new Date();
    this.currentDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
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
  search(KeyValue, supplierID, DeviceModelID, startTime, endTime) {
    this.rows = [];
    this.query = {
      OID: this.OID,
      ODID: this.ODID,
      DeviceModelID: DeviceModelID,
      BindStatus: this.BindStatus,
      KeyValue: KeyValue ? KeyValue.trim() : '',
      SuppliersID: supplierID,
      StartTime: new TransDatePipe().transform(startTime) || '',
      EndTime: new TransDatePipe().transform(endTime) || '',
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
    this.getRenderList = this.vehicleInstallService.GetVehicleList(this.query).subscribe(
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
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
        this.isModal = false;
        this.text = '';
      }
    );
  }

  // record
  record(item) {
    this.currentItem = item;
    this.showRecordAlert = true;
  }


  // 绑定或解绑
  bind(item) {
    if (item.BindStatus) {
      // 显示解绑弹窗
      this.currentItem = item;
      this.showUnBindAlert = true;
    } else {
      // 显示绑定弹窗
      this.currentItem = item;
      this.showBindAlert = true;
    }
  }


  closeAlert(e) {
    this.showRecordAlert = false;
    this.showBindAlert = false;
    this.showUnBindAlert = false;
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
    this.rows = [];
    this.list = [];
  }

}
