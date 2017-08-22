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
  selector: 'app-scan-record',
  templateUrl: './scan-record.component.html',
  styleUrls: ['./scan-record.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ScanRecordComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public getId: any;
  public id: number;
  public did: number;
  public vid: number;
  public _getCarInfo_: any;
  public getRenderList: any;
  public carinfo: any;
  constructor(
    private vehicleConditionMonitorService: VehicleConditionMonitorService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { did: any, vid: any }) => {
      if (params && params.did && params.vid) {
        this.did = parseInt(params.did, 10);
        this.vid = parseInt(params.vid, 10);
        this.getCarInfo({ Vid: this.vid });
      }
    });
  }

  // 获取所有数据
  getList() {
    this.query.VID = this.vid;
    this.query.OBDDataType = 0;
    this.getRenderList = this.vehicleConditionMonitorService.GetPageCarMonitorLogs(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
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


  getCarInfo(data) {
    this._getCarInfo_ = this.vehicleConditionMonitorService.VehicleDetail(data).subscribe(
      (res) => {
        if (res.State) {
          this.carinfo = res.Data;
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

  detail(item): void {
    this.router.navigate(['../../../detail', item.ID], { relativeTo: this.activatedRoute });
  }

  // 销毁
  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }


}
