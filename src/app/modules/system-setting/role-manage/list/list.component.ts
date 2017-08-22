import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';
// 服务
import { RoleManageService } from '../role-manage.service';
import { EventsService } from '../../../../services/events-service.service';
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public getUserLit: any; // 获取用户列
  public showDeleteAlert: boolean;
  public showAllotMenuAlert: boolean;
  public keyword: string; // 关键词
  public currentItem: any;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private roleManageService: RoleManageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {
    super(router, activatedRoute);
  }
  ngOnInit() {
  }
  // 分配菜单弹窗关闭事件
  closeAllotMenuAlert(e) {
    this.showAllotMenuAlert = false;
  }
  // 分配菜单弹窗
  allotMenu(item) {
    this.showAllotMenuAlert = true;
    this.currentItem = item;
  }
  // 删除
  delete(item) {
    this.showDeleteAlert = true;
    this.currentItem = item;
  }
  // 删除弹窗关闭事件
  closeDeleteAlert(e) {
    this.showDeleteAlert = false;
    if (e) {
      this.DeleteLocalItem(e);
    }
  }
  // 删除本地缓指定信息
  DeleteLocalItem(data) {
    this.list.forEach((item, key) => {
      if (item.ID === data.ID) {
        this.list.splice(key, 1);
      }
    });
  }
  // 搜索
  search(val) {
    this.rows = [];
    this.query = {
      RoleName: val,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }
  // 获取所有数据
  getList() {
    this.getUserLit = this.roleManageService.GetPageRoleList(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.text = '';
        this.isModal = false;
      },
      (err) => {

        if (err.State == 10 || err.State == 11 || err.State == 12) {
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(() => {
            this.router.navigate(['/account/login']);
          }, 2500)
        } else {
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
        this.text = '';
        this.isModal = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.getUserLit) {
      this.getUserLit.unsubscribe();
    }
    this.list = [];
    this.rows = [];
  }
}
