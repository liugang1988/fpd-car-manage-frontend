import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 服务
import { DeviceInService } from '../device-in.service';
import { EventsService } from '../../../../../services/events-service.service';
// 基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

@Component({
  selector: 'app-sim-detail',
  templateUrl: './sim-detail.component.html',
  styleUrls: ['./sim-detail.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class SimDetailComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public simInfo: any; // 保存硬件相关信息
  public SimpleKey: string; // 搜索关键字
  public getId: any;
  public id: string;
  public getRenderList: any;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private deviceInService: DeviceInService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.checkAction();
  }


  // 搜索
  search(SimpleKey) {
    this.rows = [];
    this.query = {
      SimpleKey: SimpleKey ? SimpleKey.trim() : '',
      PageIndex: 1,
      PageSize: 10,
      ID: parseInt(this.id, 10),
      IsSearchTotal: true
    };
    this.getList();
    this.isModal = true;
    this.text = '查询中...';
  }


  // 根据是否存在id判断是新增还是修改还是查看详情
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.StorageSIMListInfo({ ID: parseInt(this.id, 10) });
        this.getList(parseInt(this.id, 10));
      }
    });
  }


  // 设备入库明细（SIM卡）
  StorageSIMListInfo(data) {
    this.deviceInService.DetailStorageSW(data).subscribe((res) => {
      if (res.Data) {
        this.simInfo = res.Data;
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

  // 设备入库明细列表
  getList(data?: any) {
    if (data) {
      this.query.ID = data;
    }
    this.getRenderList = this.deviceInService.SWStorageList(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.isModal = false;
        this.text = '';
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
        this.isModal = false;
        this.text = '';
      }
    );
  }

  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    if (this.getId) {
      this.getId.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }
}

