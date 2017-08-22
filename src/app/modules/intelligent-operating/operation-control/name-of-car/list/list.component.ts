import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { NameOfCarService } from '../name-of-car.service';
import { EventsService } from '../../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';

// 表格基类
import { MitDataTableBase } from './../../../../../widgets/mit-data-table/mit-data-table-base';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public OrderNumber: any;
  public OID: any;
  constructor(
    private nameOfCarService: NameOfCarService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  selectDept(e) {

  }
  search(OrderNumber) {

  }

  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
  }
}
