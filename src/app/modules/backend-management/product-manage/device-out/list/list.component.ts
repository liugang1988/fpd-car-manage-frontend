import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../../services/events-service.service';


// 服务
import { DeviceOutService } from '../device-out.service';


// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public DeviceSupplierID: number; // 供应商ID
  public DeviceModelID: number; // 产品型号ID
  public SalesOrderNo: any; // 订单号
  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素
  public OrderNumber: any;
  public getRenderList: any;

  public text:any;
  public isModal:boolean = false;
  constructor(
    private eventsService: EventsService,
    private deviceOutService: DeviceOutService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  // 搜索
  search(SalesOrderNo) {
    this.rows = [];
    this.query = {
      DeviceSupplierID: this.DeviceSupplierID,
      DeviceModelID: this.DeviceModelID,
      SalesOrderNo: SalesOrderNo,
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
    this.getRenderList = this.deviceOutService.GetDeviceDelivery(this.query).subscribe(
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

 
  // 获取供应商ID
  getSupplierID(e) {
    this.DeviceSupplierID = e;
  }
  // 获取产品型号
  getDeviceModelID(e) {
    this.DeviceModelID = e;
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
