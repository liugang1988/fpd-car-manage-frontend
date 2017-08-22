import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { VehicleInformationService } from '../vehicle-information.service';
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

  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素
  public showImportAlert = false; // 导入弹窗
  public KeyValue: string; // 关键词
  public OID:any; // 组织ID
  public ODID: number; // 部门ID
  public getRenderList: any; 
  public _download:any;

  public text:any;
  public isModal:boolean = false;
  constructor(
    private vehicleInformationService: VehicleInformationService, 
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

  // 搜索
  search(KeyValue) {
    this.rows = [];
    this.query = {
      KeyValue: KeyValue ? KeyValue.trim() : '',
      OID: this.OID,
      ODID: this.ODID,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.isModal = true;
    this.text = '查询中...';
  }


  // 获取所有数据
  getList(pageIndex?) {
    this.getRenderList = this.vehicleInformationService.VehicleList(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: pageIndex ? pageIndex : this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.isModal = false;
        this.text = '';
      },
      (err) => {
        this.isModal = false;
        this.text = '';
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

  // 获取当前日期
  format(){
    let date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  // 导出
  download(KeyValue){
    const data = {
      KeyValue: KeyValue || '',
      ODID: this.ODID || -1
    }
    this.isModal = true;
    this.text = '导出中...';
    this._download = this.vehicleInformationService.VehicleExportExcel(data).subscribe((res) => {
        const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
        const objectUrl = URL.createObjectURL(blob); 
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, '车辆档案' + this.format());
        } else {
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display:none');
          a.setAttribute('href', objectUrl);
          a.setAttribute('download','车辆档案' + this.format());
          a.click();
          URL.revokeObjectURL(objectUrl);
        }
        this.isModal = false;
        this.text = '';
    },(err) => {
      this.isModal = false;
      this.text = '';
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

  // 删除确认事件
  closeAlert(e) {
    this.showDeleteAlert = false;
    if (e && e.ID) {
      this.DelVehicle({ Vid: e.ID });
    }
  }

  // 发起删除请求
  DelVehicle(data) {
    this.vehicleInformationService.DeleteVehicle(data).subscribe((res) => {
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



  // 关闭导入窗口
  closeImportAlert(e) {
    this.showImportAlert = false;
    this.rows = [];
    this.list = [];
    this.getList(1);
  }


  // 销毁
  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    if(this._download){
      this._download.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
