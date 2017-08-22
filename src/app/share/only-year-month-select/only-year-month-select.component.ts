import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

// 动画
import { fadeIn } from '../../animation/fadeIn';

@Component({
  selector: 'app-only-year-month-select',
  templateUrl: './only-year-month-select.component.html',
  styleUrls: ['./only-year-month-select.component.scss'],
  animations: [fadeIn]
})
export class OnlyYearMonthSelectComponent implements OnInit {
  @Input() public placeholder: string;
  @Input() public range: any;
  @Input() public defaultValue?: any;
  @Output() public result = new EventEmitter();
  public selected: any;
  public isExpand = false;
  public selectYear: any;
  public selectMonth: any;
  public selectYearRange: Array<any> = [];
  public selectMonthRange: Array<any> = [];
  constructor(
    private _el: ElementRef
  ) { }

  ngOnInit() {
    this.getCurrentDate();
  }

  // 获取当前的年月
  getCurrentDate(): void{
    if(this.defaultValue){
      const dateArr = this.defaultValue.split('-');
      this.selectYear = dateArr[0];
      this.selectMonth = dateArr[1];
    } else {
      const TODAY = new Date();
      this.selectYear = TODAY.getFullYear();
      this.selectMonth = TODAY.getMonth() < 9 ? '0' + (TODAY.getMonth() + 1) : String(TODAY.getMonth() + 1);
      this.defaultValue = this.selectYear + '-' + this.selectMonth;
    }
     this.selectYearRange.push(
        {
          date: this.selectYear,
          active: true,
          type: 'year'
        }
      );
    this.getRangeYear(this.selectYear, this.range.before, this.range.after);
    this.getRangeMonth(this.selectMonth);
    this.emitResult();
  }

  //需要生成的日期范围
  getRangeYear(year:number, before:number = 5, after:number = 10):void {
    let _beforeYear = year;
    let _afterYear = year;
    for(let i = 0; i< before; i++){
      this.selectYearRange.unshift({
        date: ++_beforeYear,
        active: false,
        type: 'year'
      });
    };
    for(let j = 0; j< after; j++){
      this.selectYearRange.push({
        date: --_afterYear,
        active: false,
        type: 'year'
      });
    };
  }

  //月份范围
  getRangeMonth(month): any {
    for (let i = 0; i < 12; i++) {
      const temp = i < 9 ? '0' + (i + 1) : '' + (i + 1);
      this.selectMonthRange.push(
        {
          date: temp,
          active: false,
          type: 'month'
        }
      );
    }
    this.selectMonthRange[parseInt(month)-1].active = true;
  }

  // 年份或者月份选择
  actValue(list: any, index: number) {
    list.forEach((v, i) => {
      if (i === index) {
        v.active = true;
        if (v.type === 'year') {
          this.selectYear = v.date;
        }
        if (v.type === 'month') {
          this.selectMonth = v.date;
        }
      } else {
        v.active = false;
      }
    });
    this.emitResult();
  }

  // 获取结果集
  emitResult(e?: any) {
    if (e) {
      this.isExpand = false;
    }
    this.selected = this.selectYear + '-' + this.selectMonth;
    this.result.emit(this.selected);
  }

  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
      this.emitResult();
    }
  }

}



