import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { DeviceOutService } from '../device-out.service';
import { EventsService } from '../../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class DetailComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public id: any; // 获取id
  public deviceOutDetail: any; // 设备出库详情
  public deviceList: Array<any>; // 设备清单列表
  public getId: any;
  public _deviceOutDetail: any;
  public _deviceList: any;

  public SimpleKey: string; // 搜索关键字

  public text: any;
  public isModal: boolean = false;
  constructor(
    private deviceOutService: DeviceOutService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改还是查看详情
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.getDeviceOutDetail({ DeliveryID: parseInt(this.id, 10) });
        this.getDeviceList();
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

  // 获取设备出库详情
  getDeviceOutDetail(data) {
    this._deviceOutDetail = this.deviceOutService.DetailDeviceDelivery(data).subscribe((res) => {
      if (res.Data) {
        this.deviceOutDetail = res.Data;
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

  // 搜索
  search(SalesOrderNo) {
    this.rows = [];
    this.query = {
      ID: this.id,
      SimpleKey: this.SimpleKey,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getDeviceList();
    this.isModal = true;
    this.text = '查询中...';
  }

  // 获取设备清单
  getDeviceList() {
    this.query.ID = parseInt(this.id, 10);
    this._deviceList = this.deviceOutService.DeviceDeliveryDetailList(this.query).subscribe((res) => {
      if (res.Data) {
        this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
        if (this.query.IsSearchTotal) {
          this.totalCount = res.Data.TotalCount;
        }
        this.getLocalData();
      }
      this.isModal = false;
      this.text = '';
    }, (err) => {
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
    });
  }
  // 销毁
  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
    if (this._deviceOutDetail) {
      this._deviceOutDetail.unsubscribe();
    }
    if (this._deviceList) {
      this._deviceList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }
}
