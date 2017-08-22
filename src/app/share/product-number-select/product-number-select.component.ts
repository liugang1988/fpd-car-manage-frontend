import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { fadeIn } from '../../animation/fadeIn';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';
// 服务
import { ProductNumberSelectService } from './product-number-select.service';

// 接口规范
import { IProductNumberSelect } from './product-number-select.model';
@Component({
  selector: 'app-product-number-select',
  templateUrl: './product-number-select.component.html',
  styleUrls: ['./product-number-select.component.scss'],
  animations: [fadeIn]
})
export class ProductNumberSelectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() SupplierId: number; // 外部获取的供应商ID
  @Input() defaultVal: number;
  @Input() showAll = false;
  @Output() result: EventEmitter<any> = new EventEmitter(); // 输出选中结果
  public selected: String; // 选中结果
  public searcVal: String;  // 临时变量
  public isExpand = false;
  public array: Array<any> = [];

  public currentSupplierId: number;

  public _GetDeviceModelBySupplierId_: any;

  constructor(
    private _eref: ElementRef,
    private productNumberSelectService: ProductNumberSelectService,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.SupplierId  && this.SupplierId !== this.currentSupplierId) {
      this.GetDeviceModelBySupplierId();
    }else if(this.SupplierId <= 0){
      this.array = [];
      this.isExpand = false;
      this.selected = null;
      this.searcVal = null;
    }
    this.currentSupplierId = this.SupplierId;
  }

  GetDeviceModelBySupplierId() {
    const data = { 'SupplierId': this.SupplierId };
    this.array = [];
    this._GetDeviceModelBySupplierId_ = this.productNumberSelectService.GetDeviceModelBySupplierId(data).subscribe((res) => {
      if (res.State) {
        if (res.Data.length !== 0) {
          this.isExpand = true;
          this.selected = '';
          this.array = res.Data;
          this.setDafultVal(this.array);
        } else {
          this.isExpand = true;
          this.selected = '暂无产品';
          this.result.emit(null);
        }
      }
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

  setDafultVal(array) {
    if (!this.defaultVal) {
      this.isExpand = true;
    }
    if (array.length && this.defaultVal) {
      array.forEach((item) => {
        if (item.ID === this.defaultVal) {
          this.selected = item.DeviceCategory;
        };
      });
    }
  }


  selectHandler(item) {
    if (item !== 'all') {
      this.selected = item.DeviceCategory;
      this.result.emit(parseInt(item.ID, 10));
    } else {
      this.result.emit(-1);
      this.selected = '全部';
    }
  }

  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
      this.searcVal = undefined;
    }
  }

  // 输入事件
  inputEnter(event) {
    this.searcVal = event;
  }

  ngOnDestroy() {
    if (this._GetDeviceModelBySupplierId_) {
      this._GetDeviceModelBySupplierId_.unsubscribe();
    }
  }

}
