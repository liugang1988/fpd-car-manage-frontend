import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverManagementService } from './driver-management.service';
import { EventsService } from '../../../../services/events-service.service';
@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent implements OnInit {
  public DriverCount: any; // 驾驶员人数
  public DriverAllCount: number; // 统计的驾驶员人数
  public SafeDriving: any; // 安全驾驶
  public DrivingBehavior: any; // 驾驶行为
  public MoralHazard: any; // 道德风险

  // 模拟数据
  public SafeDrivingData = {
    "tiredDriving": 10,
    "generalSpeed": 152,
    "severitySpeed": 52,
    "generalOverSpeed": 352,
    "severityOverSpeed": 10,
    "flyDriving": 2
  };
  public MoralHazardData = [15, 20, 8];

  public safeDrive: any = {
    "tiredDriving": 0,
    "generalSpeed": 0,
    "severitySpeed": 0,
    "generalOverSpeed": 0,
    "severityOverSpeed": 0,
    "flyDriving": 0
  }; // 安全驾驶数据
  constructor(
    private driverManagementService: DriverManagementService,
    private router: Router,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    // 驾驶行为
    this.getDriverBehaviorNumber();
    // 驾驶员人数
    this.getDriverNumber();

    // 安全驾驶
    this.getSafeDriving();

    // 道德风险
    this.getMoralHazard();

    // 驾驶行为
    // this.SafeDriving = {
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: '{a} <br/>{b}: {c} ({d}%)'
    //   },
    //   grid: {
    //     left: '1%',
    //     right: '1%',
    //     top: '1%',
    //     bottom: '1%',
    //     containLabel: true
    //   },
    //   legend: {
    //     orient: 'vertical',
    //     x: 'right',
    //     align: 'left',
    //     textStyle: {
    //       color: '#2b3e4f',
    //       fontSize: '18'
    //     },
    //     padding: [85, 50],
    //     top: '10',
    //     right: '100',
    //     itemGap: 30,
    //     itemWidth: 20,
    //     itemHeight: 20,
    //     formatter: '{name}',
    //     data: [{ name: '  90分以上     人   ', value: 0 },
    //     { name: '  80-90分      人', value: 0 },
    //     { name: '  70-80分     人', value: 0 },
    //     { name: '  60-70分     人', value: 0 },
    //     { name: '  60分以下      人', value: 0 }]
    //   },
    //   series: [
    //     {
    //       name: '驾驶行为',
    //       type: 'pie',
    //       radius: ['35%', '55%'],
    //       center: ['30%', '50%'],
    //       avoidLabelOverlap: false,
    //       label: {
    //         normal: {
    //           show: false,
    //           position: 'left'
    //         },
    //         emphasis: {
    //           show: false,
    //           textStyle: {
    //             fontSize: '14',
    //             fontWeight: 'bold'
    //           }
    //         }
    //       },
    //       labelLine: {
    //         normal: {
    //           show: false
    //         }
    //       },
    //       data: [
    //         { name: '  90分以上     人   ', value: 0 },
    //         { name: '  80-90分      人', value: 0 },
    //         { name: '  70-80分     人', value: 0 },
    //         { name: '  60-70分     人', value: 0 },
    //         { name: '  60分以下      人', value: 0 }
    //       ]
    //     }
    //   ],
    //   color: ['#67b7dc', '#33c5d2', '#d7c676', '#a58bd5', '#f38dcc']
    // };
    // 道德风险

  }

  // 安全驾驶
  getSafeDriving() {
    this.safeDrive = this.SafeDrivingData;
  }

  // 获取道德风险
  getMoralHazard() {
    const data = this.MoralHazardData;
    this.MoralHazard = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['风险系数1', '风险系数2', '风险系数3'],
        x: 'right'
      },
      grid: {
        top: 10,
        bottom: 50,
        right: 50,
        left: 50,
        containLabel: true,
        borderColor: '#fafafa'
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
          minInterval: 100,
          splitNumber: 1
        }
      ],
      yAxis: [
        {
          type: 'category',
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
          axisTick: {
            show: false,
            interval: 0
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
          data: ['风险系数1', '风险系数2', '风险系数3']
        }
      ],
      series: [
        {
          name: '风险系数',
          type: 'bar',
          data: data
        }
      ]
    };
  }

  /**
 * @param {number} range
 * @param {string} [type]
 * @memberOf VehicleOverviewComponent
 * @description 获取今天及前后天
 */
  getRangeDate(range: number, type?: string) {

    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };

    const now = formatDate(new Date().getTime()); // 当前时间
    const resultArr: Array<any> = [];
    let changeDate: string;
    if (range) {
      if (type) {
        if (type === 'one') {
          changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
        }
        if (type === 'more') {
          if (range < 0) {
            for (let i = Math.abs(range); i >= 0; i--) {
              resultArr.push(formatDate(new Date().getTime() + (-1000 * 3600 * 24 * i)));
            }
          } else {
            for (let i = 1; i <= range; i++) {
              resultArr.push(formatDate(new Date().getTime() + (1000 * 3600 * 24 * i)));
            }
          }

        }
      } else {
        changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
      }
    }
  }


  // 驾驶行为
  getDriverBehaviorNumber() {
    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };

    const now = formatDate(new Date().getTime()); // 当前时间
    this.driverManagementService.DriverStatics({ 'Time': now }).subscribe(
      (res) => {
        if (res.State) {
          this.setDriverBehaviorGraph(res.Data);
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

  // 设置驾驶行为图表
  setDriverBehaviorGraph(data) {
    const RINGDATA = data ? [
      { name: `  90分以上 ${data[0]}    人   `, value: data[0] },
      { name: `  80-90分 ${data[1]}     人`, value: data[1] },
      { name: `  70-80分 ${data[2]}    人`, value: data[2] },
      { name: `  60-70分  ${data[3]}   人`, value: data[3] },
      { name: `  60分以下  ${data[4]}    人`, value: data[4] }
    ] : [
        { name: '  90分以上  0   人   ', value: 0 },
        { name: '  80-90分   0   人', value: 0 },
        { name: '  70-80分  0   人', value: 0 },
        { name: '  60-70分   0  人', value: 0 },
        { name: '  60分以下   0   人', value: 0 }
      ];
    // 驾驶行为
    this.DrivingBehavior = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      grid: {
        left: '1%',
        right: '1%',
        top: '1%',
        bottom: '1%',
        containLabel: true
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        align: 'left',
        textStyle: {
          color: '#2b3e4f',
          fontSize: '18'
        },
        padding: [85, 50],
        top: '10',
        right: '100',
        itemGap: 30,
        itemWidth: 20,
        itemHeight: 20,
        formatter: '{name}',
        data: RINGDATA
      },
      series: [
        {
          name: '驾驶行为',
          type: 'pie',
          radius: ['35%', '55%'],
          center: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'left'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: RINGDATA,
          color: ['#67b7dc', '#33c5d2', '#d7c676', '#a58bd5', '#f38dcc']
        }
      ],
      color: ['#67b7dc', '#33c5d2', '#d7c676', '#a58bd5', '#f38dcc']
    };
  }

  // 获取驾驶人员
  getDriverNumber() {
    this.driverManagementService.GetAllDriverStatistics().subscribe(
      (res) => {
        if (res.State) {
          this.DriverAllCount = res.Data.TotalCount;
          this.setDriverNumberGraph(res.Data);
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

  // 设置驾驶人员图表
  setDriverNumberGraph(odata: any) {
    const DirverCountRender = [
      {
        value: odata.DriverCount[0],
        itemStyle: {
          normal: {
            color: '#3598dc'
          }
        },
      },
      {
        value: odata.DriverCount[1],
        itemStyle: {
          normal: {
            color: '#33c5d2'
          }
        },
      },
      {
        value: odata.DriverCount[2],
        itemStyle: {
          normal: {
            color: '#e74f5b'
          }
        },
      }
    ];
    // 驾驶员人数
    this.DriverCount = {
      tooltip: {
        trigger: 'axis'
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
        bottom: 20,
        right: 20,
        left: 20,
        containLabel: true,
        borderColor: '#fafafa'
      },
      xAxis: [
        {
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
          data: odata.DriverStatus ? odata.DriverStatus : ['在线', '行驶', '休眠', '离线', '停止']
        }
      ],
      yAxis: [
        {
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
            formatter: '{value}',
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
          },
          splitNumber: 1
        }
      ],
      series: [
        {
          type: 'bar',
          data: odata ? DirverCountRender : [
            {
              value: 0,
              itemStyle: {
                normal: {
                  color: '#3598dc'
                }
              },
            },
            {
              value: 0,
              itemStyle: {
                normal: {
                  color: '#33c5d2'
                }
              },
            },
            {
              value: 0,
              itemStyle: {
                normal: {
                  color: '#e74f5b'
                }
              },
            }
          ]
        }
      ]
    };

  }

}
