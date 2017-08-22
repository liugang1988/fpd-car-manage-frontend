import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.scss']
})
export class SpeedDialComponent implements OnInit, OnChanges {
  public dial: any; // 仪表盘
  @Input() option: any = []; // 仪表盘设置
  // [{name:'speed',radius:40%,position:[ '20%', '48%' ],data:0},{name:'odo',radius:40%,position:[ '20%', '48%' ],data:0},,{name:'tacho',radius:40%,position:[ '20%', '48%' ],data:0}]
  // name 表盘名称  speed  odo  tacho
  // radius 大小
  // position 位置
  // data  数值

  @Input() odo = 0; // 里程数据
  @Input() speed = 0; // 时速数据

  @Input() tacho = 0; // 转速表数据

  @Input() meter: Array<any> = [];

  constructor() { }
  ngOnInit() {
    this.Option();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.Option();
  }


  Option() {
    this.dial = {
      tooltip: {
        formatter: '{a} <br/>{c} {b}'
      },
      toolbox: {
        show: false
      },
      series: this.Meter()
    };
  }

  Meter() {
    const _arr = [];
    this.option.forEach((item) => {
      if (item.name === 'speed') {
        _arr.push(_.extend(this.Sytle(item.radius), this.SpeedMeter(item.position, item.data)));
      }
      if (item.name === 'odo') {
        _arr.push(_.extend(this.Sytle(item.radius), this.OdoMeter(item.position, item.data)));
      }
      if (item.name === 'tacho') {
        _arr.push(_.extend(this.Sytle(item.radius), this.TachoMeter(item.position, item.data)));
      }
    });
    return _arr;
  }

  Sytle(radius) {
    const option = {
      type: 'gauge',
      radius: radius,
      axisLine: {            // 坐标轴线
        lineStyle: {
          color: [[0.10, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
          width: 2
        }
      },
      axisLabel: {            // 坐标轴小标记
        textStyle: {       // 属性lineStyle控制线条样式
          color: '#000',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10,
          fontSize: 8
        }
      },
      axisTick: {            // 坐标轴小标记
        length: 8,        // 属性length控制线长
        lineStyle: {       // 属性lineStyle控制线条样式
          color: 'auto',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10,
        }
      },
      splitLine: {           // 分隔线
        length: 12,         // 属性length控制线长
        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
          width: 2,
          color: '#CCC',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10,
          height: 5
        }
      },
      pointer: {           // 分隔线
        shadowColor: '#ccc', // 默认透明
        shadowBlur: 5,
        lineStyle: {
          fontSize: 10
        }
      },
      title: {
        offsetCenter: [0, -20],       // x, y，单位px
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          fontSize: 12,
          fontStyle: 'italic',
          color: '#000',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      detail: {
        backgroundColor: 'rgba(30,144,255,0.8)',
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#fff', // 默认透明
        width: 60,
        height: 25,
        shadowBlur: 5,
        offsetCenter: [0, 60],       // x, y，单位px
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: '#fff',
          fontSize: 18
        }
      }
    };
    return option;
  }

  // 转速表
  TachoMeter(position, data) {
    const option = {
      name: '转速表',
      min: 0,
      max: 8,
      splitNumber: 8, // 步进
      center: position, // 位置,
      detail: {
        backgroundColor: 'rgba(30,144,255,0.8)',
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#fff', // 默认透明
        width: 60,
        height: 25,
        shadowBlur: 5,
        offsetCenter: [0, 60],       // x, y，单位px
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: '#fff',
          fontSize: 18
        },
        formatter: function (params, ticket, callback) // 转速值*1000
        {
          return Math.round(params * 1000);
        }
      },
      data: [
        {
          name: 'x1000 rpm',
          value: data / 1000
        }
      ]
    };
    return option;
  }

  // 里程表
  OdoMeter(position, data) {
    const option = {
      name: '里程',
      min: 0,
      max: 320,
      splitNumber: 8, // 步进
      center: position, // 位置,
      data: [
        {
          name: 'km',
          value: data
        }
      ]
    };
    return option;
  }

  // 车速表
  SpeedMeter(position, data) {
    const option = {
      name: '车速',
      min: 0,
      max: 240,
      splitNumber: 8, // 步进
      center: position, // 位置
      data: [
        {
          name: 'km/h',
          value: data
        }
      ]
    };
    return option;
  }

}
