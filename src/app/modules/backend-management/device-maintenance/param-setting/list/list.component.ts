import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { ParamSettingService } from '../param-setting.service';
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
  public ODID: number;
  public showReadAlert = false; // 删除弹窗
  public currentItem: any;
  public DeviceStatusName = -1; // 工作状态
  // public DeviceStatusNameList: any; // 设备状态列表
  public DeviceModel: any;
  public OID: any;
  public KeyValue: any;
  public supplierID: any;
  public GetRenderList: any;

  // 状态下拉
  public placeholder = '请选择设备状态';
  public optionName = "DictionaryValue";
  public optionList: Array<any>;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private eventsService: EventsService,
    private paramSettingService: ParamSettingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.DeviceEnum();
  }

  // 获取设备状态枚举
  DeviceEnum() {
    this.paramSettingService.DeviceEnum().subscribe((res) => {
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
    });
  }

  // 获取设备状态
  getDeviceStatus(e) {
    this.DeviceStatusName = e.ID;
  }

  // 搜索
  search(KeyValue, DeviceStatusName, DeviceModel: number, OID: number): void {
    this.rows = [];
    this.query = {
      DeviceModel: DeviceModel,
      KeyValue: KeyValue ? KeyValue.trim() : '',
      OID: OID,
      Status: parseInt(DeviceStatusName, 10),
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.isModal = true;
    this.text = '查询中...';
  }



  // 获取所有数据
  getList() {
    this.rows = [];
    this.GetRenderList = this.paramSettingService.DeviceParamList(this.query).subscribe(
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

  // 修改
  modify(item: any): void {
    this.router.navigate(['./edit', item.Did], { relativeTo: this.activatedRoute });
  }

  // 详情
  // detail(item: any): void {
  //   this.router.navigate(['./detail', item.Did], { relativeTo: this.activatedRoute });
  // }

  // 读取弹出
  read(item): void {
    this.showReadAlert = true;
    this.currentItem = item;
  }

  // 删除确认事件
  closeAlert(e) {
    this.showReadAlert = false;
  }



  // 销毁
  ngOnDestroy() {
    if (this.GetRenderList) {
      this.GetRenderList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
