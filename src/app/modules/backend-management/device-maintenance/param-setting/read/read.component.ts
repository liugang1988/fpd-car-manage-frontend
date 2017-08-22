import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ParamSettingService } from '../param-setting.service';
import { EventsService } from '../../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  animations: [fadeIn]
})
export class ReadComponent extends MitDataTableBase implements OnInit {
  @Output() close = new EventEmitter();
  @Input() item: any;
  public seleted: any;
  constructor(
    private paramSettingService: ParamSettingService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  // 获取所有数据
  getList() {
    this.rows = [];
    // this.paramSettingService.GetPageVehiclesWithoutCurFence(this.query).subscribe(
    //   (res) => {
    //     if (res.State) {
    //       this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
    //       if (this.query.IsSearchTotal) {
    //         this.totalCount = res.Data.TotalCount;
    //       }
    //       this.getLocalData();
    //     }
    //   },
    //   (err) => {
    //     console.log('我靠，网络错误了！');
    //   }
    // );
  }


  closeHandler(e) {
    this.close.emit(null);
  }

  saveHandler(e) {

  }

}


