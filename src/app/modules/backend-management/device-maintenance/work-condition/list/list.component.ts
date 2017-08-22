import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { WorkConditionService } from '../work-condition.service';
import { EventsService } from '../../../../../services/events-service.service';


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


  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素
  constructor(
    private eventsService: EventsService,
    private workConditionService: WorkConditionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }





  // 获取所有数据
  getList() {
    // this.UserRegisterManageService.GetSupplier( this.query ).subscribe(
    //   ( res ) => {
    //     // console.log( res );
    //     if ( res.State ) {
    //       this.rows.push( { pageNum: this.query.PageIndex, data: res.Data.CurrentData });
    //       if ( this.query.IsSearchTotal ) {
    //         this.totalCount = res.Data.TotalCount;
    //       }
    //       this.getLocalData();
    //     }
    //   },
    //   ( err ) => {

    //   }
    // );
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
      this.DeletaSupplier({ 'SupplierId': parseInt(e.ID, 10) });
    }
  }

  // 发起删除请求
  DeletaSupplier(data) {
    // this.UserRegisterManageService.DeletaSupplier( data ).subscribe(( res ) => {
    //   this.eventsService.emitMessageEvent( res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message );
    //   if ( res.State ) { this.DeleteLocalItem( data ); };
    // });
  }



  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
  }

}
