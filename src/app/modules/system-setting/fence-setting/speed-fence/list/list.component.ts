import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性


// 服务
import { SpeedFenceService } from '../speed-fence.service';
import { EventsService } from '../../../../../services/events-service.service';


// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';


// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public form: FormGroup;

  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素
  public FenceName: any;
  public listCount: any;
  public _getList:any;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private speedFenceService: SpeedFenceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(router, activatedRoute);
    this.form = fb.group({
      'IdleTime': ['', Validators.compose([Validators.required, Validators.pattern('(([1-9])|([1-5]\\d)|(60))')])],
    });
  }

  ngOnInit() {}

  // 搜索
  search(FenceName) {
    this.rows = [];
    this.query = {
      FenceName: FenceName,
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
    this.rows = [];
    this._getList = this.speedFenceService.GetPageSpeedFenceRuleList(this.query).subscribe(
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


  // 删除弹窗
  delete(item): void {
    this.showDeleteAlert = true;
    this.deleteItem = item;
  }


  // 删除确认事件
  closeAlert(e) {
    this.showDeleteAlert = false;
    if (e) {
      const data = { FenceId: e.ID };
      this.speedFenceService.DeleteFence(data).subscribe((res) => {
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.rows = [];
        this.list = [];
        this.getList();
      });
    }

  }


  // 栅栏开关
  UpdateFenceStatus(id: number, status: number): void {
    const data = {
      FenceId: id,
      Status: status ? 1 : 0
    };
    this.speedFenceService.UpdateFenceStatus(data).subscribe(
      (res) => {
        if (res.State) {
          this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
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

  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if(this._getList){
      this._getList.unsubscribe();
    }
  }


}
