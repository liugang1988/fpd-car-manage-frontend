import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { VehicleStyleManageService } from '../vehicle-style-manage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  // 获取车辆品牌下拉参数
  public placeholder = '请选择车辆品牌';
  public optionName = "BrandName";
  public optionList: Array<any>;
  // 获取车系下拉参数
  public placeholder1 = '请选择车系';
  public optionName1 = "LineName";
  public optionList1: Array<any>;

  public _getBrandList: any; 
  public _getLineList: any; 

  constructor(
    private fb: FormBuilder,
    private vehicleStyleManageService: VehicleStyleManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService) {
    this.form = fb.group({
      'BrandID': ['', Validators.required],
      'LineID': ['', Validators.required],
      'ModelName': ['', Validators.required],
      'Sort': [0]
    });
  }

  ngOnInit() {
    this.getBrandList();
    
  }

  // 获取车辆品牌ID
  getBrandID(e){
    this.form.controls['BrandID'].setValue(e.ID);
    this.getLineList({
      BID: e.ID
    });
  }

  // 获取车辆车系ID
  getLineID(e){
    this.form.controls['LineID'].setValue(e.ID);
    this.form.controls['ModelName'].setValue(e.LineName);
  }

  // 获取车辆品牌列表
  getBrandList(){
    this._getBrandList = this.vehicleStyleManageService.VehicleBrandList().subscribe((res) => {
      if (res.State) {
        this.optionList = res.Data;
      }
    },(err)=>{
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

  // 获取车辆品牌列表
  getLineList(data){
    this._getLineList = this.vehicleStyleManageService.VehicleLineList(data).subscribe((res) => {
      if (res.State) {
        this.optionList1 = res.Data;
      }
    },(err)=>{
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


  onSubmit(form) {
    this.vehicleStyleManageService.AddVehicleModel(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  // 销毁
  ngOnDestroy() {
    if( this._getBrandList ){
      this._getBrandList.unsubscribe();
    }
    if( this._getLineList ){
      this._getLineList.unsubscribe();
    }
  }

}
