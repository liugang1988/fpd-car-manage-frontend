import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 服务
import { PuchaseOrderService } from '../puchase-order.service';
import { EventsService } from '../../../../../services/events-service.service';

// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';
import { fadeIn } from '../../../../../animation/fadeIn';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public supplierID: number; // 供应商ID
  public deviceModelID: number; // 产品型号ID
  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素
  public OrderNumber: any;
  public getRenderList: any;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private puchaseOrderService: PuchaseOrderService
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
    this.getRenderList = this.puchaseOrderService.GetPurchaseList(this.query).subscribe(
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

  // 删除弹窗
  delete(item): void {
    this.showDeleteAlert = true;
    this.deleteItem = item;
  }


  // 删除确认事件
  closeAlert(e) {
    this.showDeleteAlert = false;
    if (e && e.ID) {
      this.DeletePurchase({ PurchaseDetailID: e.ID });
    }
  }

  //  发起删除请求
  DeletePurchase(data) {
    this.puchaseOrderService.DeletaPurchase(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.rows = [];
        this.list = [];
        this.getList();
      };
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }



  // 复写detail
  modify(item: any): void {
    this.router.navigate(['./edit', item.ID, item.PurchaseOrderNO], { relativeTo: this.activatedRoute });
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
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }
}
