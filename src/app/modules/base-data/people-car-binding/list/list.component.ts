import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { PeopleCarBindingService } from '../people-car-binding.service';
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

  public currentItem: any; // 需要删除的元素
  public showBindAlert = false; // 绑定弹窗

  public showUnBindAlert = false; // 解绑弹窗

  public showRecordAlert = false; // 记录弹窗
  public OID:any;  // 组织ID
  public ODID: number; // 部门ID
  public KeyWords: string; // 搜索关键词
  public BindStatus:any; // 状态筛选
  public getRenderList: any;

  // 状态下拉框
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:-1, value: '全部'},
    {ID:1, value:'已绑定'},
    {ID:0, value:'未绑定'}
  ];

  public text:any;
  public isModal:boolean = false;
  constructor(
    private peopleCarBindingService: PeopleCarBindingService, 
    private eventsService: EventsService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  // 选择状态
  getStatus(e){
    this.BindStatus = e.ID;
  }

  // 搜索
  search(KeyWords) {
    this.rows = [];
    this.query = {
      KeyWords: KeyWords ? KeyWords.trim() : '',
      BindStatus: this.BindStatus,
      OID: this.OID,
      ODID: this.ODID,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }



  // 获取所有数据
  getList(pageIndex?) {
    this.getRenderList = this.peopleCarBindingService.GetPageDriverVehicles(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: pageIndex ? pageIndex : this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.text = '';
        this.isModal = false;
      },
      (err) => {
        this.text = '';
        this.isModal = false;
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

  // 记录
  record(item) {
    this.currentItem = item;
    this.showRecordAlert = true;
  }

  // 绑定或解绑
  bind(item) {
    this.currentItem = item;
    if (item.BindStatus) {
      // 显示解绑弹窗
      this.showUnBindAlert = true;
    } else {
      // 显示绑定弹窗
      this.showBindAlert = true;
    }
  }


  // 弹窗关闭事件
  closeAlert(e) {
    this.showBindAlert = false;
    this.showUnBindAlert = false;
    this.showRecordAlert = false;
    if (e && e.state) {
      this.rows = [];
      this.list = [];
      this.getList();
    }
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
