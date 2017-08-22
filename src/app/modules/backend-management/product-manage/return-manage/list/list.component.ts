import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 服务
import { ReturnManageService } from '../return-manage.service';
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

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private returnManageService: ReturnManageService
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }




  // 获取所有数据
  getList() {
    // this.returnManageService.GetPurchaseList( this.query ).subscribe(
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




  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
  }
}
