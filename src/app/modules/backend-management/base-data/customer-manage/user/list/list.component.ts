import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { UserService } from '../user.service';
import { SingleOrganizationInterface } from '../user.interface';

// 表格基类
import { MitDataTableBase } from '../../../../../../widgets/mit-data-table/mit-data-table-base';
import { EventsService } from '../../../../../../services/events-service.service';

import { fadeIn } from '../../../../../../animation/fadeIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public getOrganizationId: any; // 获取组织ID
  public getUserLit: any; // 获取用户列
  public organizationInfo: SingleOrganizationInterface; // 组织信息
  public _organizationInfo_: any; // 存储组织信息
  public showAllotRoleAlert = false;
  public currentItem: any;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private eventsService: EventsService) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.GetOrzID();
  }




  // 更新用户状态
  updataUserStatus(ID, Status) {
    const data = {
      UserId: ID,
      UserStatus: Status ? 1 : 0
    };
    this.userService.UpdateUserStatus(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }

  // 通过url获取当前组织id
  GetOrzID() {
    this.getOrganizationId = this.activatedRoute.params.subscribe((params: { OrganizationId: string }) => {
      if (params.OrganizationId) {
        this.query.OID = parseInt(params.OrganizationId, 10);
        this.GetSingleOrganization(params.OrganizationId);
        this.getList();
      }
    }, (err) => {
      
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }




  // 获取所有数据
  getList() {
    this.getUserLit = this.userService.GetUserList(this.query).subscribe(
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

  // 获取单个组织(公司)信息
  GetSingleOrganization(OrganizationId) {
    const data = { ID: OrganizationId };
    this._organizationInfo_ = this.userService.GetSingleOrganization(data).subscribe((res) => {
      this.organizationInfo = res.Data;
    }, (err) => {
      
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }

  // 分配角色弹窗
  allotRole(item) {
    this.showAllotRoleAlert = true;
    this.currentItem = item;
  }


  // 弹窗关闭事件
  closeAllotRoleAlert(e) {
    this.showAllotRoleAlert = false;
    if (e) {
      this.rows = [];
      this.list = [];
      this.getList();
    }
  }


  // 销毁
  ngOnDestroy() {
    if (this.getOrganizationId) {
      this.getOrganizationId.unsubscribe();
    }
    if (this.getUserLit) {
      this.getUserLit.unsubscribe();
    }
    if(this._organizationInfo_){
      this._organizationInfo_.unsubscribe();
    }
    this.rows = [];
    this.list = [];

  }




}
