import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { SoftwareVersionService } from '../software-version.service';

// 表格基类
import { MitDataTableBase } from './../../../../../widgets/mit-data-table/mit-data-table-base';

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
  constructor(
    private softwareVersionService: SoftwareVersionService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }



  // 获取所有数据
  getList() {
    this.getRenderList = this.softwareVersionService.GetFirmwareList(this.query).subscribe(
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
      this.DeleteFirmware({ FirmwarmId: e.ID });
    }
  }

  // 发起删除请求
  DeleteFirmware(data) {
    this.softwareVersionService.DeleteFirmware(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        if (res.State) {
          this.rows = [];
          this.list = [];
          this.getList();
        };
      };
    });
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
