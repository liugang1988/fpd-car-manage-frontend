import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';
// 服务
import { DrivingDataService } from '../driving-data.service';
import { EventsService } from '../../../../services/events-service.service';

// 表格基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public getRenderList: any;
  public KeyValue: any;
  public OID: any;
  public ODID: any;
  public text:any;
  public isModal:boolean = false;
  public _download: any;
  constructor(
    private drivingdataService: DrivingDataService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  // 选择公司
  selectCompany(e){
    this.OID = e[0];
    this.ODID = e.length > 1 ? e[e.length -1] : -1;
  }

  // 查询
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
    this.text = '查询中...';
    this.isModal = true;
  }


  // 获取所有数据
  getList() {
    this.getRenderList = this.drivingdataService.AllTrafficData(this.query).subscribe(
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

  // 导出
  download(KeyValue) {
    const data = {
      OID: this.OID || -1,
      ODID: this.ODID || -1,
      KeyValue: KeyValue ? KeyValue.trim() : ''
    };
    this.text = '导出中...';
    this.isModal = true;
    this._download = this.drivingdataService.AllTrafficDataExportExcel(data).subscribe((res) => {
      const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
      const objectUrl = URL.createObjectURL(blob); 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, '行车数据列表');
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download','行车数据列表');
        a.click();
        URL.revokeObjectURL(objectUrl);
      }
      this.text = '';
      this.isModal = false;
    }, (err) => {
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
    });
  }


  // 详情
  detail(item: any): void {
    this.router.navigate(['./detail', item.Vid], { relativeTo: this.activatedRoute });
  }


  // 销毁
  ngOnDestroy() {
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }
    if (this._download) {
      this._download.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
