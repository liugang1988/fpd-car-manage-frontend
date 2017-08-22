import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { ChaseCarService } from '../chase-car.service';
import { EventsService } from '../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素
  constructor(private chaseCarService: ChaseCarService, private eventsService: EventsService, private router: Router, private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }




  // // 获取所有数据
  // getList() {
  //   this.deviceInstallationService.GetFirmwareList( this.query ).subscribe(
  //     ( res ) => {
  //       if ( res.State ) {
  //         console.log( res );
  //         this.rows.push( { pageNum: this.query.PageIndex, data: res.Data.CurrentData });
  //         if ( this.query.IsSearchTotal ) {
  //           this.totalCount = res.Data.TotalCount;
  //         }
  //         this.getLocalData();
  //       }
  //     },
  //     ( err ) => {

  //     }
  //   );
  // }

  // 删除弹窗
  // delete( item ): void {
  //   this.showDeleteAlert = true;
  //   this.deleteItem = item;
  // }


  // // 删除确认事件
  // closeAlert( e ) {
  //   this.showDeleteAlert = false;
  //   if ( e && e.ID ) {
  //     this.DeleteOrganization( { DeviceModelId: e.ID });
  //   }
  // }

  // // 发起删除请求
  // DeleteOrganization( data ) {
  //   this.deviceInstallationService.DeleteFirmware( data ).subscribe(( res ) => {
  //     this.eventsService.emitMessageEvent( res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message );
  //     if ( res.State ) { this.DeleteLocalItem( data ); };
  //   });
  // }



  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
  }

}
