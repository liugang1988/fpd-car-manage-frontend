import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RoleSelectService } from './role-select.service';
import { fadeIn } from '../../animation/fadeIn';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss'],
  animations: [fadeIn]
})
export class RoleSelectComponent implements OnInit, OnChanges, OnDestroy {

  @Input() showAll = false;
  @Input() OID: number;  // 组织机构ID
  @Input() defaultVal: any;  // 默认值
  @Output() result: EventEmitter<any> = new EventEmitter(); // 输出选中结果
  public selected: String; // 选中结果
  public searcVal: String;  // 临时变量
  public isExpand = false;
  public array: Array<any> = [];

  public _GetRoleList_: any;
  constructor(
    private roleSelectService: RoleSelectService,
    private _eref: ElementRef,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.GetRoleList(this.OID);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setDafultVal(this.array);
  }

  GetRoleList(OID) {
    this._GetRoleList_ = this.roleSelectService.GetRoleListByOID(OID).subscribe((res) => {
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
    if (this.defaultVal) {
      array.forEach((item) => {
        if (item.ID === this.defaultVal) {
          this.selected = item.RoleName;
        };
      });
    }
  }

  selectHandler(item) {
    if (item !== 'all') {
      this.selected = item.RoleName;
      this.result.emit(item.ID);
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
    if (this._GetRoleList_) {
      this._GetRoleList_.unsubscribe();
    }
  }

}
