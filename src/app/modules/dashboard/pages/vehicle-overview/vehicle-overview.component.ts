import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleOverviewService } from './vehicle-overview.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-vehicle-overview',
  templateUrl: './vehicle-overview.component.html',
  styleUrls: ['./vehicle-overview.component.scss']
})
export class VehicleOverviewComponent implements OnInit, AfterContentInit, OnChanges {

  public MileageFuelConsumption: any; // 里程油耗概况选项
  public AssetSecurityProfile: any; // 资产安全状况选项
  public SecurityAlarm: any; // 安全警报选项
  public VehicleConditionMonitoring: any; // 车辆监控选项

  public faultCarNum: any = 0;  // 故障车辆数量
  public maintainNum: any;  // 维修数据
  public keepNum: any; // 保养数据
  public expire: any; // 过期
  public expiring: any; // 即将过期

  // 模拟数据
  public AssetSecurityProfileData = {
    "sign": 72,
    "unsign": 18,
    "off": 12
  };
  public SecurityAlarmDataName = []; // 安全报警名称
  public SecurityAlarmData = [];  // 安全报警数据
  public VehicleConditionMonitoringDataName = [];
  public VehicleConditionMonitoringData = [];
  public maintain = {
    "maintainNum": 135,
    "keepNum": 1352,
    "expire": 532,
    "expiring": 352
  };

  public StatisticsTrackInfoAndOil: any = {
    TrackInfo: '',
    TrackOil: '',
    VehicleCount: ''
  }; // 统计所有车辆里程和油耗
  public StatisticsTrackInfoAndOilResult: any; // 起始结束日期

  constructor(
    private vehicleOverviewService: VehicleOverviewService,
    private router: Router,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    // ---车辆管理---
    this.getRangeDate(-6);

    // 资产安全概况
    //this.getAssetSecurityProfile();

    // 安全警报
    this.getAlertStatistics();

    // 车况监控
    this.getVehiclesFaultsStatistics();


    // 维修保养
    //this.getMaintain();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterContentInit() {
    this.GetStatisticsTrackInfoAndOil();
  }

  // 获取资产安全概况
  // getAssetSecurityProfile() {
  //   const data = this.AssetSecurityProfileData;
  //   // 资产安全状况
  //   this.AssetSecurityProfile = {
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: '{a} <br/>{b}: {c} ({d}%)'
  //     },
  //     grid: {
  //       left: '1%',
  //       right: '1%',
  //       top: '1%',
  //       bottom: '1%',
  //       containLabel: true
  //     },
  //     legend: {
  //       orient: 'vertical',
  //       x: 'right',
  //       align: 'left',
  //       textStyle: {
  //         color: '#2b3e4f',
  //         fontSize: '18',
  //       },
  //       padding: [10, 10],
  //       top: '10',
  //       right: '10',
  //       itemGap: 30,
  //       itemWidth: 20,
  //       itemHeight: 20,
  //       formatter: '{name}',
  //       data: [
  //         { name: '  车辆已签到      ', value: data.sign },
  //         { name: '  车辆未签到      ', value: data.unsign },
  //         { name: '  离线状态         ', value: data.off }
  //       ]
  //     },
  //     series: [
  //       {
  //         name: '车辆状态',
  //         type: 'pie',
  //         radius: ['25%', '45%'],
  //         center: ['35%', '55%'],
  //         avoidLabelOverlap: false,
  //         label: {
  //           normal: {
  //             show: false,
  //             position: 'left'
  //           },
  //           emphasis: {
  //             show: false,
  //             textStyle: {
  //               fontSize: '14',
  //               fontWeight: 'bold'
  //             }
  //           }
  //         },
  //         labelLine: {
  //           normal: {
  //             show: false
  //           }
  //         },
  //         data: [
  //           { name: '  车辆已签到      ', value: data.sign },
  //           { name: '  车辆未签到      ', value: data.unsign },
  //           { name: '  离线状态         ', value: data.off }
  //         ]
  //       }
  //     ],
  //     color: ['#3598dc', '#f5c362', '#bdc9d7']
  //   };
  // }

  // 获取安全警报
  getSecurityAlarm() {
    const data = this.SecurityAlarmData;
    // 安全警报
    this.SecurityAlarm = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b}:{c}',
      },
      grid: {
        top: 10,
        bottom: 20,
        right: 20,
        left: 20,
        containLabel: true,
        borderColor: '#fafafa'
      },
      xAxis: [{
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#d2d2d2',
          },
          textStyle: {
            color: '#6d7b88'
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 14,
            color: '#6d7b88'
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#eeeeee']
          }
        },
        axisTick: {
          show: false,
          interval: 0
        },
        nameTextStyle: {
          color: '#000',
          fontSize: 16
        },
        data: this.SecurityAlarmDataName
      }],
      yAxis: [{
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fafafa',
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#eeeeee']
          }
        },
        axisLabel: {
          formatter: '{value} 次',
          textStyle: {
            fontSize: 14,
            color: '#6d7b88'
          }
        },
        lineStyle: {
          color: ['#eeeeee']
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: '#000',
          fontSize: 16
        }
      }],
      series: [{
        type: 'bar',
        barWidth: '60%',
        data: this.SecurityAlarmData
      }]
    };
  }

  // 获取安全警报数据
  getAlertStatistics() {
    this.vehicleOverviewService.GetAlertStatistics().subscribe((res) => {
      const data = res.Data;
      for (let i = 0, j = data.AlertStatistics.length; i < j; i++) {
        this.SecurityAlarmDataName.push(data.AlertStatistics[i].AlertTypeDesc);
        this.SecurityAlarmData.push({
          value: data.AlertStatistics[i].Count,
          itemStyle: {
            normal: {
              color: this.getColor(data.AlertStatistics[i].AlertType)
            }
          }
        })
      }
      this.getSecurityAlarm();
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

  // 获取安全警报图标颜色
  getColor(num) {
    switch (num) {
      case 20: // 碰撞
        return '#55a2e3';
      case 24: // 翻车
        return '#e9727a';
      case 25: // 异常震动
        return '#4fd2de';
      case 49: // 水温
        return '#f5c362';
      case 51: // 亏电
        return '#7ba5e4';
      case 54: // 断电
        return '#f1748c';
      case 56: // 拖吊
        return '#54c0e8';
    }
  }

  // 获取车况监控数据
  getVehiclesFaultsStatistics() {
    this.vehicleOverviewService.VehiclesFaultsStatistics().subscribe((res) => {
      const data = res.Data;
      this.faultCarNum = data.VehicleCount || 0;
      data.VehicleFaultsStatistics.forEach(elem => {
        this.VehicleConditionMonitoringDataName.push(elem.FaultCategory);
        this.VehicleConditionMonitoringData.push(elem.Count);
      });
      this.getVehicleConditionMonitoring();
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

  // 获取车况监控
  getVehicleConditionMonitoring() {
    // 车辆监控
    this.VehicleConditionMonitoring = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: '10',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fafafa'
            },
            textStyle: {
              color: '#000000'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#eeeeee']
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              fontSize: 14,
              color: '#6d7b88'
            },
            margin: 20
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#00000',
            fontSize: 16
          },
          min: 0,
          minInterval: 100
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#d2d2d2'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#eeeeee']
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              fontSize: 14,
              color: '#6d7b88'
            }
          },
          nameTextStyle: {
            color: '#00000',
            fontSize: 16
          },
          min: 0,
          splitNumber: 1,
          minInterval: 100,
          data: this.VehicleConditionMonitoringDataName
        }
      ],
      series: [
        {
          name: '故障数',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          itemStyle: {
            color: '#f4c632'
          },
          data: this.VehicleConditionMonitoringData
        }
      ]

    };
  }

  // 获取维修保养
  // getMaintain() {
  //   this.maintainNum = this.maintain.maintainNum;
  //   this.keepNum = this.maintain.keepNum;
  //   this.expire = this.maintain.expire;
  //   this.expiring = this.maintain.expiring;
  // }

  /**
   * @param {number} range
   * @param {string} [type]
   * @memberOf VehicleOverviewComponent
   * @description 获取今天及前后天
   */
  getRangeDate(range: number) {

    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };

    const now = formatDate(new Date().getTime()); // 当前时间
    const yesterday = formatDate(new Date().getTime() - 60 * 60 * 1000 * 24);
    const beforeday = new Date().getTime() - 60 * 60 * 1000 * 24;
    const resultArr: Array<any> = [];
    let changeDate: string;
    if (range) {
      changeDate = formatDate(beforeday + (1000 * 3600 * 24 * range));
    }
    this.vehicleOverviewService.TrackAndIdilOilForDays({ StartTime: changeDate, EndTime: yesterday }).subscribe(
      (res) => {
        if (res.State) {
          this.MileageFuelConsumptionFn(res.Data);
        }
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
      }
    );
  }

  // 里程油耗概况
  MileageFuelConsumptionFn(data): void {
    data.Date = data.Date.map((value, index) => {
      return value.substr(5, value.length);
    });
    const XDATA = data.Date && data.Date.length !== 0 ? data.Date : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const TRACKDATA = data.TrackOil && data.Date.TrackOil !== 0 ? data.TrackOil : [0, 0, 0, 0, 0, 0, 0];
    const IDLEOILDATA = data.IdleOil && data.Date.IdleOil !== 0 ? data.IdleOil : [0, 0, 0, 0, 0, 0, 0];

    // 里程油耗概况
    this.MileageFuelConsumption = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },

      legend: {
        data: ['行驶油耗', '怠速油耗'],
        x: 'right'
      },
      toolbox: {
        feature: {
          saveAsImage: {
            show: false
          }
        }
      },
      grid: {
        top: 10,
        bottom: 40,
        right: 20,
        left: 20,
        containLabel: true,
        borderColor: '#fafafa'
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: true,
            color: '#dfdddf'
          },
          axisLabel: {
            margin: 20,
            rotate: 0, // 刻度旋转45度角
            interval: 0,
            textStyle: {
              color: '#707c8c',
              fontSize: 14
            }
          },
          nameTextStyle: {
            color: 'black',
            fontSize: 16
          },
          data: XDATA
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fafafa'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#eeeeee']
            }
          },
          axisLabel: {
            formatter: '{value} L',
            margin: 20,
            textStyle: {
              fontSize: 14,
              color: '#6d7b88'
            }
          },
          axisTick: {
            show: true,
            color: '#dfdddf'
          },
          nameTextStyle: {
            color: 'black',
            fontSize: 16
          },
          min: 0,
          splitNumber: 1,
          minInterval: 100,
        }
      ],
      series: [
        {

          symbolSize: 10,
          type: 'line',
          smooth: true,
          barGap: 0,
          scaleGridLineColor: 'rgba(248,248,248,1)',
          name: '行驶油耗',
          stack: '总量',
          lineStyle: {
            normal: {
              color: '#a8d4f1'
            }
          },
          itemStyle: {
            normal: {
              color: '#a8d4f1',
              opacity: 0
            }
          },
          areaStyle: {
            normal: {
              color: '#a8d4f1',
              opacity: 1
            }
          },
          data: TRACKDATA
        },
        {
          symbolSize: 10,
          type: 'line',
          smooth: true,
          barGap: 0,
          scaleGridLineColor: 'rgba(248,248,248,1)',
          stack: '总量',
          name: '怠速油耗',
          lineStyle: {
            normal: {
              color: '#3598dc'
            }
          },
          itemStyle: {
            normal: {
              color: '#3598dc',
              opacity: 0
            }
          },
          areaStyle: {
            normal: {
              color: '#3598dc',
              opacity: 1
            }
          },
          data: IDLEOILDATA
        }
      ]
    };
  }


  // 统计所有车辆里程和油耗
  GetStatisticsTrackInfoAndOil() {
    this.vehicleOverviewService.StatisticsTrackInfoAndOil().subscribe(
      (res) => {
        if (res.State) {
          this.StatisticsTrackInfoAndOil = res.Data;
        }
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
      }
    );
  };

}
