import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';
import { OrganizationSelectService } from './organization-select.service';
import { fadeIn } from '../../animation/fadeIn';
@Component({
  selector: 'app-organization-select',
  templateUrl: './organization-select.component.html',
  styleUrls: ['./organization-select.component.scss'],
  animations: [fadeIn]
})
export class OrganizationSelectComponent implements OnInit, OnDestroy {
  @Input() showAll = false;
  @Input() defaultVal: any;  // 默认值
  @Output() result: EventEmitter<any> = new EventEmitter(); // 输出选中结果
  public selected: String; // 选中结果
  public searcVal: String;  // 临时变量
  public isExpand = false;
  public array: Array<any> = [];

  public _GetList_: any;
  constructor(
    private organizationSelectService: OrganizationSelectService,
    private _eref: ElementRef,
    private eventsService: EventsService,
    private router: Router
  ) { }


  ngOnInit() {
    this.GetList();
  }


  GetList() {
    this._GetList_ = this.organizationSelectService.OrganizationListinfo().subscribe((res) => {
      if (res.State) {
        this.array = res.Data;
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

  selectHandler(item) {
    if (item !== 'all') {
      this.selected = item.OrganizationName;
      this.result.emit(item.ID);
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
  ngOnDestroy() {
    if (this._GetList_) {
      this._GetList_.unsubscribe();
    }
  }

}
