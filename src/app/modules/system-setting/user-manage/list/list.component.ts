import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';

// 服务
import { UserManageService } from '../user-manage.service';
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
  public getUserList: any; // 获取用户列
  public KeyWords: string; // 关键词
  public showAllotRoleAlert = false;
  public RoleID: number; // 角色ID
  public loginUserInfo: any = JSON.parse(localStorage.getItem('account_base_info')).CurUserInfo;
  public currentItem: any;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private userManageService: UserManageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {}

  updataUserStatus(UserId, Status, RoleName) {
    const data = {
      UserId: UserId,
      UserStatus: Status ? 1 : 0
    };
    if (RoleName === this.loginUserInfo.RoleName || RoleName === this.loginUserInfo.RoleName) {
      return;
    } else {
      this.userManageService.UpdateUserStatus(data).subscribe((res) => {
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      });
    }
  }

  // 搜索
  search(KeyWords, RoleID) {
    this.rows = [];
    this.query = {
      KeyWords: KeyWords ? KeyWords.trim() : '',
      RoleID: RoleID,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }


  // 分配角色弹窗关闭事件
  closeAllotRoleAlert(e) {
    this.showAllotRoleAlert = false;
    if (e) {
      this.rows = [];
      this.list = [];
      this.getList();
    }
  }


  // 分配角色弹窗
  allotRole(item) {
    this.showAllotRoleAlert = true;
    this.currentItem = item;
  }

  // 选择角色
  selectRole(event) {
    this.RoleID = event;
  }


  // 获取所有数据
  getList() {
    this.getUserList = this.userManageService.GetUserList(this.query).subscribe(
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
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
        this.text = '';
        this.isModal = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.getUserList) {
      this.getUserList.unsubscribe();
    }
    this.list = [];
    this.rows = [];
  }

}
