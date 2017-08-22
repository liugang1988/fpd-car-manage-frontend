import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { VehicleSelectService } from './vehicle-select.service';
import { IVehicleSelect } from './vehicle-select.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';

@Component({
  selector: 'app-vehicle-select',
  templateUrl: './vehicle-select.component.html',
  styleUrls: ['./vehicle-select.component.scss']
})
export class VehicleSelectComponent implements OnInit, OnDestroy {

  @Input() selected: string;
  @Output() result = new EventEmitter();

  public searcBrandVal: string;
  public searcLineVal: string;
  public searcModelVal: string;
  public CurrentBrand: any;
  public CurrentLine: any;
  public CurrentModel: any;
  public isExpand = false;

  public brandList: Array<any>;

  public vehicleModelList: Array<any>;

  public vehicleLineList: Array<any>;


  public _getBrandList_: any;

  public _GetVehicleLineList_: any;
  public _GetVehicleModelList_: any;
  constructor(
    private vehicleSelectService: VehicleSelectService,
    private _eref: ElementRef,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBrandList();
  }


  // 获取品牌
  getBrandList() {
    this.vehicleSelectService.GetVehicleBrandList().subscribe((res) => {
      this.brandList = res.Data;
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


  // 获取车系
  GetVehicleLineList(BID) {
    const data = { BID: BID };
    this.vehicleSelectService.GetVehicleLineList(data).subscribe((res) => {
      this.vehicleLineList = res.Data;
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


  // 获取车型
  GetVehicleModelList(LID) {
    const data = { LID: LID };
    this.vehicleSelectService.GetVehicleModelList(data).subscribe((res) => {
      this.vehicleModelList = res.Data;
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




  // 选择
  select(brand, line, model) {
    this.selected = brand.BrandName + '/' + line.LineName + '/' + model.ModelName;
    const data = {
      BID: brand.ID,
      LID: line.ID,
      MID: model.ID,
    };
    this.result.emit(data);
  }

  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
    }
  }

  ngOnDestroy() {
    if (this._getBrandList_) {
      this._getBrandList_.unsubscribe();
    }
    if (this._GetVehicleLineList_) {
      this._GetVehicleModelList_.unsubscribe();
    }
    if (this._GetVehicleModelList_) {
      this._GetVehicleModelList_.unsubscribe();
    }
  }


}
