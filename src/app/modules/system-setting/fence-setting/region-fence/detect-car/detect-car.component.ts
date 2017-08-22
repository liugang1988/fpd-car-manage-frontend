import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RegionFenceService } from '../region-fence.service';
import { EventsService } from '../../../../../services/events-service.service';

// 基类g
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

@Component({
  selector: 'app-detect-car',
  templateUrl: './detect-car.component.html',
  styleUrls: ['./detect-car.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class DetectCarComponent extends MitDataTableBase implements OnInit ,OnDestroy{
  @Output() close = new EventEmitter();
  @Input() item: any;
  public ODID: number; // 部门id
  public Plate: string; //  车牌
  public VehicleIds: Array<number> = []; // 车辆IDS
  public FenceId: number; // 栅栏ID

  public isCheckAll = false; // 是否全选
  public seleted: any;

  public _getList:any;
  public _addFenceVehicle:any;

  public text: any;
  public isModal: boolean = false;
  constructor(
    private regionFenceService: RegionFenceService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private el: ElementRef
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {}


  // 选择部门
  selectDept(e) {
    this.ODID = e;
  }

  // 搜索
  search(Plate, ODID) {
    this.rows = [];
    this.query = {
      KeyWord: Plate ? Plate.trim() : '',
      ODID: ODID,
      PageIndex: 1,
      PageSize: 5,
      IsSearchTotal: true
    };
    this.getList();
    this.text = '查询中...';
    this.isModal = true;
  }

  // 获取所有数据
  getList() {
    this.rows = [];
    this.query.PageSize = 5;
    this.query.FenceID = this.item;
    this._getList = this.regionFenceService.GetPageVehiclesWithoutCurFence(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
        }
        this.text = '';
        this.isModal = false;
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
        this.text = '';
        this.isModal = false;
      }
    );
  }

  // 全选或者反选
  SelectOrCancelAll(e, data): any {
    this.VehicleIds = [];
    if (e.target.checked) {
      data.forEach((v, i) => {
        this.VehicleIds.push(v.VID);
        v.checked = true;
      });
    } else {
      data.forEach((v, i) => {
        v.checked = false;
        this.isCheckAll = false;
      });
      this.VehicleIds = [];
    }
  }

  // 单个checkbox
  singleCheck(list) {
    this.VehicleIds = [];
    this.isCheckAll = false;
    list.forEach((v, i) => {
      if (v.checked) {
        this.VehicleIds.push(v.VID);
      }
    });
    if (this.VehicleIds.length === list.length) {
      this.isCheckAll = true;
    }
  }

  saveHandler(item: number) {
    const data = {
      VehicleIds: this.VehicleIds,
      FenceId: item,
    };
    this.AddFenceVehicles(data);
  }

  AddFenceVehicles(data) {
    this._addFenceVehicle = this.regionFenceService.AddFenceVehicles(data).subscribe(
      (res) => {
        if (res.State) {
          this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
          this.close.emit(data);
        } else {
          this.close.emit(null);
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


  closeHandler(e) {
    this.close.emit(null);
  }

  ngOnDestroy() {
    if(this._getList){
      this._getList.unsubscribe();
    }
    if(this._addFenceVehicle){
      this._addFenceVehicle.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
