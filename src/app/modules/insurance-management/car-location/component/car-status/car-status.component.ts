import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICarStatus } from './car-status.model';
@Component({
  selector: 'app-car-status',
  templateUrl: './car-status.component.html',
  styleUrls: ['./car-status.component.scss']
})
export class CarStatusComponent implements OnInit, OnChanges, OnDestroy {
  @Input() defaultVal: number;
  @Input() vehicleStateObj: ICarStatus;
  @Output() changeState = new EventEmitter();
  status: Array<any>;
  currentItem: number; // 　当前选择值　默认-1

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentItem = this.defaultVal;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.status = [
      {
        name: '全部',
        number: this.vehicleStateObj.AllCount,
        value: -1,
        class: 'all'
      }, {
        name: '运行',
        number: this.vehicleStateObj.Run,
        value: 8,
        class: 'run'
      }, {
        name: '停止',
        number: this.vehicleStateObj.Stop,
        value: 16,
        class: 'stop'
      }, {
        name: '离线',
        number: this.vehicleStateObj.OffLine,
        value: 1,
        class: 'offline'
      }];
  }



  selected(item) {
    this.currentItem = item.value;
    this.changeState.emit(this.currentItem);
  }

  ngOnDestroy() {
    this.vehicleStateObj = null;
    this.status = null;
  }

}
