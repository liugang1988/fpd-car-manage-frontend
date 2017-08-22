import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { UserRegisterManageService } from '../user-register-manage.service';
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
  public showModifyAlert = false;
  public modifyItem: any;
  public showDisposeAlert= false;
  public showDisposeItem: any;
  public registeStatus = -1;
  // 状态下拉
  public placeholder = '请选择状态';
  public optionName = "DictionaryValue";
  public optionList: Array<any>;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private userRegisterManageService: UserRegisterManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.getStatusEnum();
  }

  // 搜索
  search() {
    this.rows = [];
    this.query = {
      KeyValue: this.registeStatus,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.isModal = true;
    this.text = '查询中...';
  }

  // 获取状态
  getStatus(e) {
    this.registeStatus = e.ID;
  }

  // 获取状态枚举
  getStatusEnum() {
    this.userRegisterManageService.DealStatusEnum().subscribe((res) => {
      if (res.State) {
        this.optionList = res.Data;
      }
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    })
  }

  // 获取所有数据
  getList() {
    this.query.KeyValue = this.registeStatus;
    this.userRegisterManageService.CollectUserList(this.query).subscribe((res) => {
      if (res.State) {
        this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
        if (this.query.IsSearchTotal) {
          this.totalCount = res.Data.TotalCount;
        }
        this.getLocalData();
      }
      this.isModal = false;
      this.text = '';
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
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
      this.DeletaSupplier({ 'ID': parseInt(e.ID, 10) });
    }
  }

  // 发起删除请求
  DeletaSupplier(data) {
    this.userRegisterManageService.DeleteCollectUser(data).subscribe((res) => {
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

  // 处理弹窗
  dispose(item): void {
    this.showModifyAlert = true;
    this.modifyItem = item;
  }

  // 处理事件
  disposeSupplier(e) {
    this.showModifyAlert = false;
    if (e && e.ID) {
      const data = {
        ID: e.ID,
        Status: e.Status,
        Remark: e.Remark
      }
      this.userRegisterManageService.DealCollectUser(data).subscribe((res) => {
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
  }

  // 处理结果弹窗
  show(item): void {
    this.showDisposeAlert = true;
    this.showDisposeItem = item;
  }

  // 关闭结果弹窗
  showDispose(){
    this.showDisposeAlert = false;
    this.showDisposeItem = '';
  }

  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
  }

}
