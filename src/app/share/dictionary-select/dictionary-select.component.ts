import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { DictionarySelectService } from './dictionary-select.service';
import { EventsService } from '../../services/events-service.service';
import { Router, ActivatedRoute } from '@angular/router';
// <app-dictionary-select param="[1,2,3]"></app-dictionary-select>
// param 请按顺序传入
@Component({
  selector: 'app-dictionary-select',
  templateUrl: './dictionary-select.component.html',
  styleUrls: ['./dictionary-select.component.scss']
})
export class DictionarySelectComponent implements OnInit, OnDestroy {
  @Input() search = true;
  @Input() placeholder: Array<any>;
  @Input() param: Array<any>;
  @Input() defaultVal: Array<any> = [];
  @Output() result = new EventEmitter();
  public list: any;
  public checked: Array<any> = [];
  public resultArr: Array<any> = [];
  public isExpand = false;
  public selected: string;
  public searcVal: Array<string> = [];

  public _GetSingleDictionaryRenderList_: any;
  public _GetArrayDictionaryRenderList_: any;
  constructor(
    private dictionarySelectService: DictionarySelectService,
    private _eref: ElementRef,
    private eventsService: EventsService,
    private router: Router
  ) { }
  ngOnInit() {
    if (this.param.length > 1) {
      this.GetArrayDictionaryList(this.param);
    } else {
      this.GetSingleDictionaryList(this.param);
    }
  }


  // 设置默认值
  setDefaulVal(array, defaultVal) {
    this.selected = '';
    if (defaultVal.length) {
      this.param.forEach((i, index) => {
        array[i].forEach((item) => {
          if (item.ID === defaultVal[index]) {
            this.checked[index] = item;
            if (index !== defaultVal.length - 1) {
              this.selected += item.DictionaryValue + ' / ';
            } else {
              this.selected += item.DictionaryValue;
            }
          }
        });
      });
    }
  }

  ngOnDestroy() {
    if (this._GetArrayDictionaryRenderList_) {
      this._GetArrayDictionaryRenderList_.unsubscribe();
    }
    if (this._GetSingleDictionaryRenderList_) {
      this._GetSingleDictionaryRenderList_.unsubscribe();
    }
  }


  // 选中事件
  selectHandle(arr) {
    this.selected = '';
    arr.forEach((item, index) => {
      if (index !== arr.length - 1) {
        this.selected += item.DictionaryValue + ' / ';
      } else {
        this.selected += item.DictionaryValue;
      }
    });
    if (arr.length === this.param.length) {
      this.isExpand = false;
      //  this.searcVal = null;
      this.result.emit(arr);
    }
  }
  // 获取单个字典数组
  GetSingleDictionaryList(param) {
    this._GetSingleDictionaryRenderList_ = this.dictionarySelectService.GetSingleDictionaryList(param[0]).subscribe((res) => {
      this.list = res.Data;
      this.setDefaulVal(this.list, this.defaultVal);
    }, (err) => {
      
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
  // 获取多个字段数组
  GetArrayDictionaryList(param) {
    this._GetSingleDictionaryRenderList_ = this.dictionarySelectService.GetArrayDictionaryList(param).subscribe((res) => {
      this.list = res.Data;
      this.setDefaulVal(this.list, this.defaultVal);
    }, (err) => {
      
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
  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
      //  this.searcVal = null;
    }
  }
}
// 轮胎品牌 = 1,
// 排量 = 2,
// 登记车型 = 3,
// 使用性质 = 4,
// 变速箱参数 = 5,
// 档位 = 6,
// 排放标准 = 7,
// 燃油型号 = 8,
// 轮胎尺寸 = 9,
// 轮胎胎宽 = 10,
// 轮胎胎高 = 11,
// 油费承担 = 12,
// 车辆颜色 = 13,
// 产品型号支持功能 = 14
