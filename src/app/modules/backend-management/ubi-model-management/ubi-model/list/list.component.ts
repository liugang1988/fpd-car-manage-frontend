import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { UbiModelService } from '../ubi-model.service';
// 基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';
// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn,bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素
  public deleteModel: any;
  public getRenderList: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ubiModelService: UbiModelService,
    private eventsService: EventsService
  ) {
    super(router, activatedRoute)
   }

  ngOnInit() {
  }

  // 获取UBI模型列表数据
  getList() {
    this.getRenderList = this.ubiModelService.GetUBIModelList(this.query).subscribe((res) => {
      if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
    }, (err) => {
      if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }

  // 启用状态
  updateStatus(id, status) {
    const data = {
      ID: id,
      status: status ? 1 : 0
    };
    this.ubiModelService.UpdateModelStatus(data).subscribe((res) => {
      this.eventsService.emitMessageEvent( res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message );
    }, (err) => {
      this.eventsService.emitMessageEvent( err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message );
    });
  }

  // 删除弹窗
  delete(item: any): void {
    this.showDeleteAlert = true;
    this.deleteItem = item;
  }

  // 删除确认事件
  closeAlert(e) {
    this.showDeleteAlert = false;
    if ( e && e.ID ) {
      this.deleteUBIModel({ id: e.ID });
    }
  }

  // 发起删除请求
  deleteUBIModel(data) {
    this.deleteModel = this.ubiModelService.DeleteUBIModel(data).subscribe((res) => {
      this.eventsService.emitMessageEvent( res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message );
      if ( res.State ) {
        this.rows = [];
        this.list = [];
        this.getList();
      }
    }, (err) => {
      this.eventsService.emitMessageEvent( err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message );
    });
  }

  // 销毁
  ngOnDestroy() {
    if ( this.getRenderList ) {
      this.getRenderList.unsubscribe();
    }
    if ( this.deleteModel ) {
      this.deleteModel.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
