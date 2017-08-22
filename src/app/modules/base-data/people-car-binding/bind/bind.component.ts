import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PeopleCarBindingService } from '../people-car-binding.service';
import { EventsService } from '../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.scss']
})
export class BindComponent extends MitDataTableBase implements OnInit {
  @Output() close = new EventEmitter();
  @Input() item: any;
  public ODID: number; // 部门id
  public Plate: string; //  车牌
  public seleted: any;
  constructor(
    private peopleCarBindingService: PeopleCarBindingService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }


  ngOnInit() {
    this.query.PageSize = 5;
  }

  // 选择部门
  selectDept(e) {
    this.ODID = e;
  }

  // 搜索
  search(Plate, ODID) {
    this.rows = [];
    this.query = {
      Plate: Plate ? Plate.trim() : '',
      ODID: ODID,
      PageIndex: 1,
      PageSize: 5,
      IsSearchTotal: true
    };
    this.getList();
  }


  // 获取所有数据
  getList() {
    this.peopleCarBindingService.GetUnbindPageVehicles(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
      },
      (err) => {
        
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
      }
    );
  }


  // 人车绑定
  BindDriverVehicle(data) {
    this.peopleCarBindingService.BindDriverVehicle(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.close.emit({ action: 'bind', state: res.State, DID: data.DID });
      } else {
        this.close.emit(null);
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

  saveHandler(DID, VID) {
    const data = {
      DID: DID,
      VID: VID
    };
    this.BindDriverVehicle(data);
  }


  closeHandler(e) {
    this.close.emit(null);
  }

}
