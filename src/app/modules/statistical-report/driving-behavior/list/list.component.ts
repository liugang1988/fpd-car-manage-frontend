import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';

// 服务
import { DrivingBehaviorService } from '../driving-behavior.service';
import { EventsService } from '../../../../services/events-service.service';

// 表格基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn,bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public KeyValue: any;
  public ODID: any;
  public OID:any;
  public Time:any;
  public BID:any;  // 品牌
  public LID:any;  // 车系
  public MID:any;  // 车型
  public DepartureValue: any; // 偏离值选项
  public DepartureMinValue:any;   // 偏离值开始值
  public DepartureMaxValue: any; // 偏离值结束值
  public _getList:any;
  public _download:any;
  public defaultValue:any;

  public advanceSearchStatus:boolean = false;

  // 状态下拉
  public placeholder = '请选择偏离值项';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:1, value:'急加速偏离值(%)'},
    {ID:2, value:'急减速偏离值(%)'},
    {ID:3, value:'急转弯偏离值(%)'},
    {ID:4, value:'快速变道偏离值(%)'},
  ];

  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private drivingBehaviorService: DrivingBehaviorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {}

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  // 品牌车系
  selectVehicle(e) {
    this.BID = e.BID;
    this.LID = e.LID;
    this.MID = e.MID;
  }

  // 高级查询
  advanceSearch(){
    this.advanceSearchStatus = !this.advanceSearchStatus;
    // 隐藏时，重置数据
    if(!this.advanceSearchStatus){
      this.BID = null;
      this.LID = null;
      this.MID = null;
      this.DepartureValue= null; 
      this.DepartureMinValue = null;  
      this.DepartureMaxValue = null; 
    }
  }

  // 偏离值项
  getStatus(e){
    this.DepartureValue = e.ID;
  }

  search(KeyValue) {
    this.rows = [];
    this.query = {
      OID: this.OID,
      ODID: this.ODID,
      Month:this.Time,
      KeyValue: KeyValue,
      VehicleBrand: this.BID,
      VehicleLine: this.LID,
      DepartureValue: this.DepartureValue,
      DepartureMinValue: +this.DepartureMinValue,
      DepartureMaxValue: +this.DepartureMaxValue,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }

  getList() {
    this.query.Month = this.Time;
    this._getList = this.drivingBehaviorService.GetDrivingBehaviorSummary(this.query).subscribe(
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
       if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
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
      OID: this.OID || -1,
      ODID: this.ODID || -1,
      Month: this.Time,
      KeyValue: KeyValue,
      VehicleBrand: this.BID,
      VehicleLine: this.LID,
      DepartureValue: this.DepartureValue,
      DepartureMinValue: +this.DepartureMinValue,
      DepartureMaxValue: +this.DepartureMaxValue,
    };
    this.text = '导出中...';
    this.isModal = true;
    this._download = this.drivingBehaviorService.DrivingBehavior(data).subscribe((res) => {
      const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
      const objectUrl = URL.createObjectURL(blob); 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, '驾驶行为统计报表' + this.Time);
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download','驾驶行为统计报表' + this.Time);
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

  
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if (this._getList) {
      this._getList.unsubscribe();
    }
    if( this._download ){
      this._download.unsubscribe();
    }
  }
}
