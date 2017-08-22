import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { fadeIn } from '../../animation/fadeIn';

@Component({
  selector: 'app-mit-time-picker',
  templateUrl: './mit-time-picker.component.html',
  styleUrls: ['./mit-time-picker.component.scss'],
  animations: [fadeIn]
})
export class MitTimePickerComponent implements OnInit {
  @Input() placeholder = '';
  @Input() selected = '';

  @Input() maxTime: string;

  @Input() minTime: string;


  @Output() timeResult = new EventEmitter();

  public isExpand = false;
  public hourArr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

  // tslint:disable-next-line:max-line-length
  public minuteArr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  public hour: any;
  public minute: any;
  public second: any;
  constructor(private _eref: ElementRef) { }

  ngOnInit() {
    // const _time = new Date();
    // const _hours = JSON.stringify(_time.getHours());
    // const _minutes = JSON.stringify(_time.getMinutes());
    // this.hour = _hours.length !== 1 ? _hours : '0' + _hours;
    // this.minute = _minutes.length !== 1 ? _minutes : '0' + _minutes;
    // this.selected = this.hour + ':' + this.minute;
  }


  selectedHandle(hour, minute) {
    this.selected = (hour ? hour : '00') + ':' + (minute ? minute : '00');
    this.timeResult.emit(this.selected);
  }


  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
    }
  }
}
