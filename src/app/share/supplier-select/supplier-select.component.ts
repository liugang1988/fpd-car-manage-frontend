import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { SupplierSelectService } from './supplier-select.service';
import { fadeIn } from '../../animation/fadeIn';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';
@Component({
  selector: 'app-supplier-select',
  templateUrl: './supplier-select.component.html',
  styleUrls: ['./supplier-select.component.scss'],
  animations: [fadeIn]
})
export class SupplierSelectComponent implements OnInit, OnChanges, OnDestroy {

  @Input() showAll = false;
  @Output() result: EventEmitter<any> = new EventEmitter(); // 输出选中结果
  @Input() defaultVal: string; // 默认名称
  public selected: any; // 选中结果
  public searcVal: String;  // 临时变量
  public isExpand = false;
  public array: Array<any> = [];
  public _GetSupplierList_: any;

  constructor(
    private _eref: ElementRef,
    private supplierSelectService: SupplierSelectService,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.GetSupplierList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setDafultVal(this.array);
  }

  GetSupplierList() {
    this._GetSupplierList_ = this.supplierSelectService.GetSupplierListNoPage().subscribe((res) => {
      if (res.State) {
        this.array = res.Data;
        this.setDafultVal(this.array);
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
    if (array.length && this.defaultVal) {
      array.forEach((item) => {
        if (item.ID === this.defaultVal.toString() || item.ID === this.defaultVal) {
          this.selected = item.SuppliersName;
        };
      });
    }
  }

  selectHandler(item) {
    if (item !== 'all') {
      this.selected = item.SuppliersName;
      this.result.emit(parseInt(item.ID, 10));
    } else {
      this.result.emit(0);
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
    if (this._GetSupplierList_) {
      this._GetSupplierList_.unsubscribe();
    }
  }

}
