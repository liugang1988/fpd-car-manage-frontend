import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss']
})
export class SearchAreaComponent implements OnInit {

  @Output() searchEvt = new EventEmitter;
  public startTime: any;
  public endTime: any;
  constructor() { }

  ngOnInit() {
  }

  search(startTime, endTime) {
    const _startTime = startTime.year + '-' + startTime.month + '-' + startTime.day;
    const _endTime = endTime.year + '-' + endTime.month + '-' + endTime.day;
    this.searchEvt.emit({ startTime: new Date(_startTime), endTime: new Date(_endTime) });
  }

}
