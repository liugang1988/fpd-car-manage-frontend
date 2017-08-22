import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';
import { EventsService } from '../../../../services/events-service.service';

// services
import { VehicleFaultService } from '../vehicle-fault.service';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn]
})
export class DetailComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public getId: any;
  public Vid: number;
  public getRenderList: any;
  public vehicleItem: any;

  public Status = -1;
  public FaultCode: any;
  public _VehicleDetail_: any;
  // 状态下拉框
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID: -1, value: '全部'},
    {ID: 0, value:'未清除'},
    {ID: 1, value:'已清除'}
  ];

  public text: any;
  public isModal: boolean = false;
  constructor(
    private vehicleFaultService: VehicleFaultService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.getId = this.activatedRoute.params.subscribe((params: { vid: string }) => {
      this.Vid = parseInt(params.vid, 10);
      this.VehicleDetail(this.Vid);
      this.query.Vid = this.Vid;
      this.query.Status = -1;
    });
  }

  // 获取状态
  getStatus(e){
    this.Status = e.ID;
  }

  // 查询
  search(FaultCode) {
    this.rows = [];
    this.query = {
      Vid: this.Vid,
      FaultCode: FaultCode ? FaultCode.trim() : '',
      Status: this.Status,
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
    this.getRenderList = this.vehicleFaultService.SingleVehicleFaultList(this.query).subscribe(
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

  // 获取车辆信息
  VehicleDetail(vid) {
    const data = { Vid: vid };
    this._VehicleDetail_ = this.vehicleFaultService.VehicleDetail(data).subscribe((res) => {
      if (res.State) {
        this.vehicleItem = res.Data;
      }
    }, (err) => {

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


  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    if (this._VehicleDetail_) {
      this._VehicleDetail_.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
