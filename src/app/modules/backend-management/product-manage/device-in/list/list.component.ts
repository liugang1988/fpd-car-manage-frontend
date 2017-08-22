import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { DeviceInService } from '../device-in.service';

import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';
// 表格基类
import { MitDataTableBase } from './../../../../../widgets/mit-data-table/mit-data-table-base';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public OrderNumber: number;
  public supplierID: number; // 供应商ID
  public deviceModelID: number; // 产品型号ID

  public getRenderList: any;

  public text:any;
  public isModal:boolean = false;
  constructor(
    private eventsService: EventsService,
    private deviceInService: DeviceInService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  // 搜索
  search(OrderNumber) {
    this.rows = [];
    this.query = {
      SuppliersName: this.supplierID,
      Name: this.deviceModelID,
      OrderNumber: OrderNumber,
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
    this.getRenderList = this.deviceInService.GetStorageList(this.query).subscribe(
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


  // 进入不同的详情页
  detail(item) {
    if (item.DeviceCategory === 'OBD' || item.DeviceCategory === '潜伏者') {
      this.router.navigate(['./obd/detail', item.ID], { relativeTo: this.activatedRoute });
    }
    if (item.DeviceCategory === 'SIM') {
      this.router.navigate(['./sim/detail', item.ID], { relativeTo: this.activatedRoute });
    }
  }

  // 获取供应商ID
  getSupplierID(e) {
    this.supplierID = e;
  }

  getDeviceModelID(e) {
    this.deviceModelID = e;
  }

  // 销毁
  ngOnDestroy() {
    if( this.getRenderList ){
      this.getRenderList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }
}
