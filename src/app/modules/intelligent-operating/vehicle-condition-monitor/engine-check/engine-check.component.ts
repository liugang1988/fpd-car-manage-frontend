import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { VehicleConditionMonitorService } from '../vehicle-condition-monitor.service';
import { EventsService } from '../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';
import { flyIn } from '../../../../animation/flyIn';

// 管道
import { TransDatePipe } from '../../../../widgets/mit-pipe/TransDate/trans-date.pipe';

@Component({
  selector: 'app-engine-check',
  templateUrl: './engine-check.component.html',
  styleUrls: ['./engine-check.component.scss'],
  animations: [fadeIn, bounceIn, flyIn]
})
export class EngineCheckComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public getId: any;
  public did: number;
  public vid: number;
  public carinfo: any;
  public _getCarInfo_: any;
  public currentDate: any;
  public startTime: any;
  public endTime: any;
  public yesterdayPicker: any;
  public engineStatusChart: any;
  constructor(
    private vehicleConditionMonitorService: VehicleConditionMonitorService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.checkAction();
    this.getTime();

  }


  getTime() {
    const today = new Date();
    this.currentDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    const _yesterday: any = new Date().getTime() - 60 * 60 * 1000 * 24;
    const yesterDate: any = new Date(_yesterday);
    this.yesterdayPicker = {
      year: yesterDate.getFullYear(),
      month: yesterDate.getMonth() + 1,
      day: yesterDate.getDate()
    };
    this.startTime = this.currentDate;
    this.endTime = this.currentDate;
    this.search(this.startTime, this.endTime);
  }



  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { did: any, vid: any }) => {
      if (params && params.did && params.vid) {
        this.did = parseInt(params.did, 10);
        this.vid = parseInt(params.vid, 10);
        this.getCarInfo({ Vid: this.vid });
      }
    });
  }

  // 搜索
  search(startTime, endTime) {
    const param = {
      Did: this.did,
      StartTime: new TransDatePipe().transform(startTime),
      EndTime: new TransDatePipe().transform(endTime)
    };
    this.getChartInfo(param);

  }

  // 获取图表的数据
  getChartInfo(data) {
    this.vehicleConditionMonitorService.GetIdleDrigramsData(data).subscribe(
      (res) => {
        if (res.State) {
          this.renderChart(res.Data);
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



  // 车辆信息
  getCarInfo(data) {
    this._getCarInfo_ = this.vehicleConditionMonitorService.VehicleDetail(data).subscribe(
      (res) => {
        if (res.State) {
          this.carinfo = res.Data;
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

  // 图标值
  renderChart(data) {
    const Max = data.ThrottleMax && data.ThrottleMax.length !== 0 ? data.ThrottleMax.map((v) => { return (v * 100).toFixed(0); }) : [0, 0, 0, 0, 0, 0, 0];
    const Min = data.ThrottleMin && data.ThrottleMin.length !== 0 ? data.ThrottleMin.map((v) => { return (v * 100).toFixed(0); }) : [0, 0, 0, 0, 0, 0, 0];
    this.engineStatusChart = {
      title: {
        text: '怠速节气门状况'
      },
      tooltip: {
        trigger: 'axis',
        show: true,
        showDelay: 0,
        hideDelay: 0,
        transitionDuration: 0,
        formatter: function (param) {
          return param[0].seriesName + ':' + param[0].value + '%'
            + '<br/>' + param[1].seriesName + ':' + param[1].value + '%';
        }
      },
      legend: {
        data: ['怠速节气门最大值', '怠速节气门最小值']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.IdelIndex ? data.IdelIndex : ['1', '2', '3', '4', '5', '6', '7']
      },
      yAxis: {
        type: 'value',
        name: '百分比(%)',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: '怠速节气门最大值',
          type: 'line',
          hoverAnimation: true,
          legendHoverLink: true,
          tooltip: {
            formatter: '{b}%'
          },
          data: Max,
        },
        {
          name: '怠速节气门最小值',
          type: 'line',
          hoverAnimation: true,
          legendHoverLink: true,
          data: Min
        }
      ]
    };


  }


  // 销毁
  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
  }

}
