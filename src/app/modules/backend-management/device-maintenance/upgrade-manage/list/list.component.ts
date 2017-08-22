import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { UpgradeManageService } from '../upgrade-manage.service';
import { EventsService } from '../../../../../services/events-service.service';


// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';



// 管道
import { TransDatePipe } from '../../../../../widgets/mit-pipe/TransDate/trans-date.pipe';
import { bounceIn } from '../../../../../animation/bounceIn';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})

export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {


  public showUpgradeAlert = false; // 显示升级弹窗
  public showRecordAlert = false; // 显示记录弹窗
  public currentDate: any;
  public DeviceStatus = -1;
  //public DeviceStatusList;
   // 状态下拉
  public placeholder = '请选择设备状态';
  public optionName = "DictionaryValue";
  public optionList: Array<any>;

  public OID: any;

  public supplierID: any;
  public DeviceModelID: any;
  public FirmwareID: any;
  public StartTime: any;
  public EndTime: any;
  public IMEI: any;
  public Plate: any;
  public _getList:any;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private upgradeManageService: UpgradeManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    const today = new Date();
    this.currentDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.getDeviceEnum();
  }


  // 获取设备状态枚举(运行，休眠，离线)
  getDeviceEnum() {
    this.upgradeManageService.DeviceEnum().subscribe(
      (res) => {
        if (res.State) {
          this.optionList = res.Data;
        }
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
      }
    );
  }

  // 获取设备状态
  getDeviceStatus(e) {
    this.DeviceStatus = e.ID;
  }

  // 搜索
  search(OID, DeviceModelID, IMEI, DeviceStatus, StartTime, EndTime, Plate, FirmwareID) {
    this.rows = [];
    this.query = {
      OrganizationID: OID,
      FirmwareID: FirmwareID,
      DeviceModelID: DeviceModelID,
      IMEI: IMEI ? IMEI.trim() : '',
      DeviceStatus: parseInt(DeviceStatus, 10) || parseInt(DeviceStatus, 10) === 0 ? parseInt(DeviceStatus, 10) : 0,
      StartTime: new TransDatePipe().transform(StartTime) || '',
      EndTime: new TransDatePipe().transform(EndTime) || '',
      Plate: Plate ? Plate.trim() : '',
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
    this._getList = this.upgradeManageService.GetList(this.query).subscribe(
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



  // UpgradeAlert
  UpgradeAlert(e) {
    this.showUpgradeAlert = false;
  }

  // 销毁
  ngOnDestroy() {
    if(this._getList){
      this._getList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
