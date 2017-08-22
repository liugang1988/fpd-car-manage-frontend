import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkWithHref } from '@angular/router';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';

// 服务
import { DrivingDataService } from '../driving-data.service';
import { EventsService } from '../../../../services/events-service.service';

// 表格基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';


// 管道
import { TransDatePipe } from '../../../../widgets/mit-pipe/TransDate/trans-date.pipe';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn]
})
export class DetailComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public getRenderList: any;
  public getRenderData: any;
  public getId: any;
  public vid: any;
  public Time: any;
  public StartTime:any;
  public EndTime: any;
  public currentDate: any;
  public TrackData: any;
  public text: any;
  public isModal: boolean = false;
  public _download: any;
  constructor(
    private drivingdataService: DrivingDataService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }



  ngOnInit() {
    this.getId = this.activatedRoute.params.subscribe((params: { vid: string, StartTime: string }) => {
      this.vid = parseInt(params.vid, 10);
      this.Time = params.StartTime;
      if (params.vid && params.StartTime) {
        this.getDrvingDataSearchParam(this.vid, params.StartTime);
        this.StartTime = new TransDatePipe().transform(this.Time);
        this.EndTime = new TransDatePipe().transform(this.Time);
      } else {
        this.getRecord({ Vid: this.vid });
      }

    });

    const today = new Date();
    this.currentDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }


  getDrvingDataSearchParam(vid, StartTime) {
    const _stime = decodeURIComponent(StartTime);
    this.rows = [];
    this.query = {
      Vid: vid,
      EndTime: _stime,
      StartTime: _stime,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getRecord({ Vid: vid, StartTime: _stime, EndTime: _stime });
    this.getList();
  }

  search(StartTime, EndTime) {
    const _startTime = new TransDatePipe().transform(StartTime);
    const _endTime = new TransDatePipe().transform(EndTime);
    this.rows = [];
    this.query = {
      Vid: this.query.Vid,
      EndTime: _endTime,
      StartTime: _startTime,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getRecord({ Vid: this.query.Vid, StartTime: _startTime, EndTime: _endTime });
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }



  // 获取行程记录
  getList() {
    this.query.Vid = this.vid;
    this.getRenderList = this.drivingdataService.SingleVehicleTrackInfo(this.query).subscribe(
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
        if (err.State == 10 || err.State == 11 || err.State == 12) {
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(() => {
            this.router.navigate(['/account/login']);
          }, 2500)
        } else {
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
      }
    );
  }


  // 获取单车行程记录
  getRecord(data) {
    this.getRenderData = this.drivingdataService.SingleTrafficData(data).subscribe((res) => {
      if (res.State) {
        this.TrackData = res.Data;
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

  // 导出
  download(StartTime, EndTime) {
    const data = {
      Vid: this.vid,
      StartTime: new TransDatePipe().transform(StartTime),
      EndTime: new TransDatePipe().transform(EndTime)
    };
    if (StartTime && EndTime) {
      const start = StartTime.year + '-' + StartTime.month + '-' + StartTime.day;
      const end = EndTime.year + '-' + EndTime.month + '-' + EndTime.day;
      this.text = '导出中...';
      this.isModal = true;
      this._download = this.drivingdataService.SingleVehicleTrackInfoExportExcle(data).subscribe((res) => {
        const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
        const objectUrl = URL.createObjectURL(blob); 
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, '单车历史行程' + start + '至' + end);
        } else {
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display:none');
          a.setAttribute('href', objectUrl);
          a.setAttribute('download','单车历史行程' + start + '至' + end);
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
    } else {
      this.eventsService.emitMessageEvent(this.eventsService.eventNames.EVENT_TOAST_ERROR, '请选择开始时间和结束时间！');
    }

  }

  // 返回
  back() {
    if(this.Time){
      this.router.navigate(['../../../'], { relativeTo: this.activatedRoute });
    }else{
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    }
  }


  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
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
