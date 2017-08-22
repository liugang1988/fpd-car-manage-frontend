import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

// 服务
import { UpgradeManageService } from '../upgrade-manage.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent extends MitDataTableBase implements OnInit, OnDestroy {
  @Input() item: any;
  @Output() close = new EventEmitter();

  constructor(
    private upgradeManageService: UpgradeManageService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.query.KeyValue = this.item.ID;
  }

  // 获取所有数据
  getList() {
    this.upgradeManageService.GetUpdateRecordList(this.query).subscribe(
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

  // 关闭
  closeHandler(e) {
    this.close.emit(null);
  }

  ngOnDestroy() {

  }

}
