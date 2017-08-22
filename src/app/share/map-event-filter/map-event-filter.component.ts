import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// 动画
import { flyIn } from '../../animation/flyIn';

@Component({
  selector: 'app-map-event-filter',
  templateUrl: './map-event-filter.component.html',
  styleUrls: ['./map-event-filter.component.scss'],
  animations: [flyIn]
})
export class MapEventFilterComponent implements OnInit {

  @Output() result = new EventEmitter();
  @Input() checkedList = [];
  public list = [
    { id: 16, name: '急刹车' },
    { id: 17, name: '急加油' },
    { id: 18, name: '快速变道' },
    { id: 19, name: '弯道加速'},
    { id: 20, name: '碰撞'},
    { id: 21, name: '频繁变道'},
    { id: 22, name: '烂路高速行驶'},
    { id: 23, name: '急转弯'},
    { id: 24, name: '翻车'},
    { id: 25, name: '异常震动'},
    { id: 32, name: '车门异常状态提醒' },
    { id: 33, name: '胎压和手刹异常状态提醒'},
    { id: 48, name: '超速报警'},
    { id: 49, name: '水温报警'},
    { id: 50, name: '转速报警'},
    { id: 51, name: '电瓶电压报警'},
    { id: 52, name: '车辆故障报警'},
    { id: 53, name: '怠速报警'},
    { id: 54, name: '断电报警'},
    { id: 55, name: '终端异常上报'},
    { id: 56, name: '拖吊报警'},
    { id: 57, name: '疲劳驾驶报警'},
    { id: 224, name: '原地空转'}
  ];
  public eventList = [];
  public currentFilter: string = 'fpd fpd-paixuxia';
  public eventBoxStatus: boolean = false; // 下拉框状态
  public eventShow: boolean = false;  // 事件展开状态
  public gradientShow: boolean = false; // 速度段展开状态


  public gradientOpenObj = {
    checked: false
  }
  constructor() {

  }

  ngOnInit() {
    
  }

  check(list) {
    // 如果是事件展开,则广播事件数据
    if(this.eventShow && !this.gradientShow){
      this.result.emit(list.filter((e) => { return e.checked; }));
    }else if(!this.eventShow && this.gradientShow){
      // 如果是速度段展开,则广播速度段状态
      list.checked = !list.checked;
      this.result.emit(list.checked);
      // 当点击显示或隐藏速度段时,会清除覆盖物,需要重置事件状态
      this.eventList = this.eventList.map((item)=>{
          const obj = {
            num: null,
            id: null,
            name: null,
            checked: false
          };
          obj.num = item.num;
          obj.id = item.id;
          obj.name = item.name;
          return obj;
        })
    }
    
  }
  // 显示事件数据
  showEvent(){
    if((!this.eventShow && !this.gradientShow) || (!this.eventShow && this.gradientShow)){
      this.eventBoxStatus = true;
      this.eventShow = true;
      this.gradientShow = false;
    }else if(this.eventShow && !this.gradientShow){
      this.eventBoxStatus = false;
      this.eventShow = false;
      this.gradientShow = false;
    }
  }
  // 显示速度段数据
  showGradient(){
    if((!this.eventShow && !this.gradientShow) || (this.eventShow && !this.gradientShow)){
      this.eventBoxStatus = true;
      this.eventShow = false;
      this.gradientShow = true;
    }else if(!this.eventShow && this.gradientShow){
      this.eventBoxStatus = false;
      this.eventShow = false;
      this.gradientShow = false;
    }
  }

  getEvent(arr){
    const obj = {};
    let name;
    let id;
    let key;
    let checked;
    for(let i=0;i<arr.length;i++){
      name = arr[i].EventType;
      id= arr[i].EventType;
      checked = false;
      key = id + '-' + name;
      if(!!obj[key]){
        obj[key]++;
      }else{
        obj[key] = 1;
      } 
    }
    for(let item in obj){
      this.eventList.push(
        {
          id: item.split('-')[0],
          name: item.split('-')[1],
          checked: false,
          num: obj[item]
        }
      )
    }
  };

  ngOnChanges(){
    this.eventList = [];
    this.getEvent(this.checkedList);
  }
}
