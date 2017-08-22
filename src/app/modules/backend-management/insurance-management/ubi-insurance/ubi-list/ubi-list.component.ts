import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

// 服务
import { UbiInsuranceService } from '../ubi-insurance.service';
import { EventsService } from '../../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';


@Component({
  selector: 'app-ubi-list',
  templateUrl: './ubi-list.component.html',
  styleUrls: ['./ubi-list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class UbiListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public id: any;
  public getId: any;
  public ubiDetail: any;  // ubi保险明细
  public _ubiDetail: any;
  public actualUBIForTime: any;  // 搜索ubi信息
  public _actualUBIForTime: any;
  public currentDate: any;
  public StartTime: any;  // 开始时间
  public EndTime: any;  // 结束时间
  public StartTimeShow: any;  // 开始时间
  public EndTimeShow: any;  // 结束时间
  public selectList = [
    { ID: 1, value: '当天', time: 0 },
    { ID: 2, value: '昨天', time: 86400000 },
    { ID: 3, value: '近7天', time: 518400000 },
    { ID: 4, value: '近30天', time: 2505600000 },
    { ID: 5, value: '自定义' },
  ];
  public currentItem = 1; // 　当前选择值　默认1
  public dateComponentStatus: boolean = false; // 日期选择组件状态

  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private ubiInsuranceService: UbiInsuranceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.checkAction();
  }

  // 获取ID
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { Vid: string }) => {
      if (params.Vid) {
        this.id = parseInt(params.Vid, 10);
        this.getDetail({ Vid: this.id });
        this.selectInit(0);
      }
    });
  }

  // 获取ubi明细
  getDetail(data) {
    this._ubiDetail = this.ubiInsuranceService.GetUBIInsuranceItem(data).subscribe((res) => {
      if (res.Data) {
        this.ubiDetail = res.Data;
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
  // 日期选择初始化
  selectInit(time) {
    const nowDate = new Date();
    const nowTime = nowDate.getTime();
    const beforeDate = new Date(nowTime - time);
    this.StartTimeShow = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
    this.EndTimeShow = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
  }

  // 筛选
  selectDate(id, time) {
    this.rows = [];
    this.query.PageIndex = 1;
    this.query.IsSearchTotal = true;
    this.currentPage = 1;
    if (id == 5) {
      this.dateComponentStatus = !this.dateComponentStatus;
      const today = new Date();
      this.currentDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    } else {
      if (this.currentItem != id) {
        this.dateComponentStatus = false;
        this.StartTime = '';
        this.EndTime = '';
        const nowDate = new Date();
        const nowTime = nowDate.getTime();
        const beforeDate = new Date(nowTime - time);
        if (id == 2) {
          this.StartTimeShow = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
          this.EndTimeShow = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
        } else {
          this.StartTimeShow = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
          this.EndTimeShow = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        }
        this.query.StartTime = this.StartTimeShow;
        this.query.EndTime = this.EndTimeShow;
        this.getList();
        this.isModal = true;
        this.text = '查询中...';
      }
    }
    this.currentItem = id;
  }

  search(StartTime, EndTime) {
    this.StartTimeShow = StartTime.year + '-' + StartTime.month + '-' + StartTime.day || '';
    this.EndTimeShow = EndTime.year + '-' + EndTime.month + '-' + EndTime.day || '';
    this.rows = [];
    this.query.PageIndex = 1;
    this.query.IsSearchTotal = true;
    this.currentPage = 1;
    this.query = {
      VID: this.id,
      StartTime: this.StartTimeShow,
      EndTime: this.EndTimeShow,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.isModal = true;
    this.text = '查询中...';
  }

  // 根据时间段搜索ubi保险
  getList() {
    this.query.VID = this.id;
    this._actualUBIForTime = this.ubiInsuranceService.GetActualUBIForTime(this.query).subscribe((res) => {
      if (res.State) {
        this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.UBIForTrackPageData.CurrentData });
        if (this.query.IsSearchTotal) {
          this.totalCount = res.Data.UBIForTrackPageData.TotalCount;
        }
        this.getLocalData();
        this.actualUBIForTime = res.Data;
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
    })
  }

  back() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  // 销毁
  ngOnDestroy() {
    if (this._ubiDetail) {
      this._ubiDetail.unsubscribe();
    }
    if (this.getId) {
      this.getId.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
