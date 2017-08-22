import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { DeviceLibraryService } from '../device-library.service';
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
  public DeviceStatusName: any; // 工作状态
  public getRenderList: any;

  public getEnumList: any;
  public OID: any;
  public IMEI: any;
  // 工作状态下拉框
  public placeholder = '请选择工作状态';
  public optionName = "DictionaryValue";
  public optionList: Array<any>;
  public text: any;
  public isModal: boolean = false;
  constructor(
    private deviceLibraryService: DeviceLibraryService,
    private eventsService: EventsService,
    private router: Router, private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.DeviceEnum();
  }

  // 选择状态
  getStatus(e){
    this.DeviceStatusName = e.ID;
  }

  // 搜索
  search(IMEI, DeviceStatusName, OID) {
    this.rows = [];
    this.query = {
      IMEI: IMEI,
      OID: parseInt(OID, 10) ? parseInt(OID, 10) : -1,
      DeviceStatusName: parseInt(DeviceStatusName, 10) ? parseInt(DeviceStatusName, 10) : -1,
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
    this.getRenderList = this.deviceLibraryService.GetDeviceList(this.query).subscribe(
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


  // 获取设备状态枚举
  DeviceEnum() {
    this.getEnumList = this.deviceLibraryService.DeviceEnum().subscribe((res) => {
      if (res.State) {
        this.optionList = res.Data;
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

  // 删除弹窗
  delete(item): void {
    this.showDeleteAlert = true;
    this.deleteItem = item;
  }



  // // 删除确认事件
  // closeAlert( e ) {
  //   this.showDeleteAlert = false;
  //   if ( e && e.ID ) {
  //     this.DeleteOrganization( { DeviceModelId: e.ID });
  //   }
  // }

  // // 发起删除请求
  // DeleteOrganization( data ) {
  //   this.deviceLibraryService.DeleteFirmware( data ).subscribe(( res ) => {
  //     this.eventsService.emitMessageEvent( res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message );
  //     if ( res.State ) { this.DeleteLocalItem( data ); };
  //   });
  // }





  // 销毁
  ngOnDestroy() {
    if (this.getEnumList) {
      this.getEnumList.unsubscribe();
    }
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
