import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { EventsService } from '../../../../../services/events-service.service';
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductNumberService } from '../product-number.service';
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素

  public getRenderList: any;
  public _DeleteOrganization_sub: any;
  constructor(
    private eventsService: EventsService,
    private productNumberService: ProductNumberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  // 获取所有数据
  getList() {
    this.getRenderList = this.productNumberService.DeviceModelList(this.query).subscribe(
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


  // 删除弹窗
  delete(item): void {
    this.showDeleteAlert = true;
    this.deleteItem = item;
  }


  // 删除确认事件
  closeAlert(e) {
    this.showDeleteAlert = false;
    if (e && e.ID) {
      this.DeleteOrganization({ DeviceModelId: e.ID });
    }
  }

  // 发起删除请求
  DeleteOrganization(data) {
    this._DeleteOrganization_sub = this.productNumberService.DeleteDeviceModel(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.rows = [];
        this.list = [];
        this.getList();
      };
    },(err)=>{
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }



  // 销毁
  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    if (this._DeleteOrganization_sub) {
      this._DeleteOrganization_sub.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
