import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { SoftwareVersionSelectService } from './software-version-select.service';
import { fadeIn } from '../../animation/fadeIn';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';
@Component({
  selector: 'app-software-version-select',
  templateUrl: './software-version-select.component.html',
  styleUrls: ['./software-version-select.component.scss'],
  animations: [fadeIn]
})
export class SoftwareVersionSelectComponent implements OnInit, OnDestroy {
  @Input() showAll = false;
  @Output() result: EventEmitter<any> = new EventEmitter(); // 输出选中结果
  public selected: any; // 选中结果
  public searcVal: String;  // 临时变量
  public isExpand = false;
  public array: Array<any> = [];
  public _GetFirmwarmList_: any;

  constructor(
    private _eref: ElementRef,
    private softwareVersionSelectService: SoftwareVersionSelectService,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.GetFirmwarmList();
  }


  GetFirmwarmList() {
    this._GetFirmwarmList_ = this.softwareVersionSelectService.GetFirmwarmList().subscribe((res) => {
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
      this.selected = item.VersionNumber;
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

  ngOnDestroy() {
    if (this._GetFirmwarmList_) {
      this._GetFirmwarmList_.unsubscribe();
    }
  }


}
