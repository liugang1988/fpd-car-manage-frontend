import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentSelectService } from './department-select.service';
import { EventsService } from '../../services/events-service.service';
// <app-department-select [OID]="1"></app-department-select>
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { fadeIn } from '../../animation/fadeIn';

@Component({
  selector: 'app-department-select',
  templateUrl: './department-select.component.html',
  styleUrls: ['./department-select.component.scss'],
  animations: [fadeIn]
})
export class DepartmentSelectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() showAll: Boolean = false;
  @Input() OID: number;  // 组织机构ID
  @Input() defaultVal: any;  // 默认值
  @Input() concatCompany: boolean = false; // 是否关联公司
  @Output() result: EventEmitter<any> = new EventEmitter(); // 输出选中结果
  public selected: String; // 选中结果
  public searcVal: String;  // 临时变量
  public isExpand: Boolean = false;
  public array: Array<any> = [];

  public currentOID: number;

  public _getDeptTree_: any;
  constructor(
    private departmentSelectService: DepartmentSelectService,
    private _eref: ElementRef,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.concatCompany){
      this.getDeptTree(this.OID);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.OID && this.OID !== this.currentOID){
      this.setDafultVal(this.array);
      if(this.concatCompany){
         this.getDeptTree(this.OID);
         this.selected = '全部';
      }else{
        this.array = [];
        this.isExpand = false;
        this.selected = null;
        this.searcVal = null;
      }
    }
    this.currentOID = this.OID;
  }


  selectHandler(item) {
    if (item !== 'all') {
      this.selected = item.DepartmentName;
      this.result.emit(item.ID);
    } else {
      this.result.emit(-1);
      this.selected = '全部';
    }

  }

  getDeptTree(OID) {
    this._getDeptTree_ = this.departmentSelectService.GetAllDeptTree(OID).subscribe((res) => {
      if (res.State) {
        this.array = res.Data.SubDepts;
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
    if (this.defaultVal && array && array.length) {
      array.forEach((item) => {
        if (item.ID === this.defaultVal) {
          this.selected = item.DepartmentName;
        };

        if (item.SubDepts !== null) {
          this.setDafultVal(item.SubDepts);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this._getDeptTree_) {
      this._getDeptTree_.unsubscribe();
    }
  }


  // 监听全局点击事件
  @HostListener('document:click', ['$event.target']) onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
      this.searcVal = undefined;
    }
  }

}
