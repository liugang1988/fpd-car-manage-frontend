import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { FuelConsumptionService } from '../fuel-consumption.service';
import { EventsService } from '../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';

// 表格基类
import { MitDataTableBase } from './../../../../widgets/mit-data-table/mit-data-table-base';

// 管道
import { TransDatePipe } from '../../../../widgets/mit-pipe/TransDate/trans-date.pipe';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class DetailComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public id:any;
  public getId:any;
  public oilSummaryDetail: any; 
  public oilSummaryChart: any;
  public chartNameList = [];
  public TotalTrackOil = [];
  public TrackIdleOil = [];
  public oilSummary:any;
  public _getDetail: any;
  public _getChart: any;
  public _getList: any;
  public _download: any;
  public currentDate: any;

  public Time: any;
  public StartTimeShow: any;  // 开始时间
  public EndTimeShow: any;  // 结束时间
  public currentItem = 4; // 　当前选择值　默认1
  public dateComponentStatus: boolean = false; // 日期选择组件状态
  public monthChooseStatus: boolean = true;  // 月份选择状态
  public selectList = [
    { ID: 1, value: '近7天', time: 7*24*60*60*1000 },
    { ID: 2, value: '本月', time: null},
    { ID: 3, value: '近30天', time: 30*24*60*60*1000 },
    { ID: 4, value: '月份', time: null },
    { ID: 5, value: '自定义', time: null },
  ];
  constructor(
    private fuelConsumptionService: FuelConsumptionService,
    private eventsService: EventsService,
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
    this.getId = this.activatedRoute.params.subscribe((params: { VID: string, time: string }) => {
      if (params.VID) {
        this.id = parseInt(params.VID, 10);
        this.Time = params.time;
        this.monthSearch();
      }
    });
  }

  // 日期选择初始化
  selectInit(time) {
    const nowDate = new Date();
    const nowTime = nowDate.getTime();
    const beforeDate = new Date(nowTime - time);
    this.EndTimeShow = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
    this.StartTimeShow = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
  }

  run(){
    this.getDetail({ 
      VID: this.id,
      StartDate: this.StartTimeShow,
      EndDate: this.EndTimeShow
    });
    this.getChart({
      VID: this.id,
      StartDate: this.StartTimeShow,
      EndDate: this.EndTimeShow
    })
    this.currentPage = 1;
    this.rows = [];
    this.query = {
      VID: this.id,
      StartDate: this.StartTimeShow,
      EndDate: this.EndTimeShow,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }

  // 筛选
  selectDate(id, time) {
    if (id == 4) {
      this.monthChooseStatus = !this.monthChooseStatus;
      this.dateComponentStatus = false;
    }else if (id == 5) {
      this.dateComponentStatus = !this.dateComponentStatus;
      this.monthChooseStatus = false;
      const today = new Date();
      this.currentDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    } else {
      if (this.currentItem != id) {
        this.dateComponentStatus = false;
        this.monthChooseStatus = false;
        if(id == 2){
          const nowDate = new Date();
          this.StartTimeShow = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + '01';
          this.EndTimeShow = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        }else{
          this.selectInit(time);
        }
        this.run();
      }
    }
    this.currentItem = id;
  }

  monthSearch(){
    if(this.Time){
      const timeArr = this.Time.split('-');
      this.StartTimeShow = timeArr[0] + '-' + timeArr[1] + '-' + '01';
      const lastTime = new Date(timeArr[0], timeArr[1], 0);
      this.EndTimeShow = timeArr[0] + '-' + timeArr[1] + '-' + lastTime.getDate();
      this.run();
    }else{
      this.eventsService.emitMessageEvent(this.eventsService.eventNames.EVENT_TOAST_ERROR, '请选择查询月份!');
    }
  }

  search(StartTime, EndTime) {
    this.StartTimeShow = StartTime.year + '-' + StartTime.month + '-' + StartTime.day || '';
    this.EndTimeShow = EndTime.year + '-' + EndTime.month + '-' + EndTime.day || '';
    this.run();
  }

  // 获取详情
  getDetail(data) {
    this._getDetail = this.fuelConsumptionService.OilSummaryDetail(data).subscribe((res) => {
        if (res.State) {
          this.oilSummaryDetail = res.Data;
        }
      },(err) => {
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

  // 获取图表
  getChart(data){
    this._getChart = this.fuelConsumptionService.OilSummaryEverydayForChart(data).subscribe((res) => {
        if (res.State) {
          this.oilSummaryChart = res.Data;
          this.chartNameList = [];
          this.TotalTrackOil = [];
          this.TrackIdleOil = [];
          if(this.oilSummaryChart){
            this.oilSummaryChart.forEach((item) => {
              this.chartNameList.push(item.Date);
              this.TotalTrackOil.push(item.TotalTrackOil);
              this.TrackIdleOil.push(item.TrackIdleOil);
            })
            this.showChart();
          }
        }
      },(err) => {
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

  // 显示图表
  showChart(){
    this.oilSummary = {
      title: {
        text: '油耗折线图',
        left: 'left'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
        data:['怠速油耗量','油耗量'],
        left: 'right'
    },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLine: {
          show: true,
          lineStyle: {
            color: '#d2d2d2',
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 14,
            color: '#6d7b88'
          }
        },
          data: this.chartNameList
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fafafa',
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#cccccc']
          }
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            fontSize: 14,
            color: '#6d7b88'
          }
        }
      },
      series: [
          {
            name: '怠速油耗量',
            type:'line',
            data: this.TrackIdleOil
          },
          {
            name: '油耗量',
            type:'line',
            data: this.TotalTrackOil
          }
      ]
    }
  }

  // 获取列表数据
  getList() {
    this.query.VID = this.id;
    this.query.StartDate = this.StartTimeShow;
    this.query.EndDate = this.EndTimeShow;
    this.rows = [];
    this._getList = this.fuelConsumptionService.OilSummaryEverydayPaged(this.query).subscribe((res) => { 
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.text = '';
        this.isModal = false;
      },(err) => {
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

  // 导出
  download() {
    const data = {
      VID: this.id,
      StartDate: this.StartTimeShow,
      EndDate: this.EndTimeShow
    };
    this.text = '导出中...';
    this.isModal = true;
    this._download = this.fuelConsumptionService.SingleOilSummaryExportExcel(data).subscribe((res) => {
      const blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
      const objectUrl = URL.createObjectURL(blob); 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, '油耗统计明细' + this.StartTimeShow + '至' + this.EndTimeShow);
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download','油耗统计明细' + this.StartTimeShow + '至' + this.EndTimeShow);
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

  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
    if (this._getDetail) {
      this._getDetail.unsubscribe();
    };
    if (this._getChart) {
      this._getChart.unsubscribe();
    };
    if (this._getList) {
      this._getList.unsubscribe();
    };
    if (this._download) {
      this._download.unsubscribe();
    };
  }

}
