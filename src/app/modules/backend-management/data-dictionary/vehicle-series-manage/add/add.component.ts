import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { VehicleSeriesManageService } from '../vehicle-series-manage.service';

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
  public _getBrandList: any;  

  constructor(
    private fb: FormBuilder,
    private vehicleSeriesManageService: VehicleSeriesManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService) {
    this.form = fb.group({
      'BrandID': ['', Validators.required],
      'LineName': ['', Validators.required],
      'Sort': [0]
    });
  }

  ngOnInit() {
    this.getBrandList();
  }

  // 获取车辆品牌ID
  getBrandID(e){
    this.form.controls['BrandID'].setValue(e.ID);
  }

  // 获取车辆品牌列表
  getBrandList(){
    this._getBrandList = this.vehicleSeriesManageService.VehicleBrandList().subscribe((res) => {
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


  onSubmit(form) {
    this.vehicleSeriesManageService.AddVehicleLine(form).subscribe((res) => {
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
  }

}
