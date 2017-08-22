import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { ProductNumberService } from '../product-number.service';
import { EventsService } from '../../../../../services/events-service.service';



@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit, OnDestroy {
  public supplierID: number; // 供应商ID
  public form: FormGroup; // 表单对象
  public getId: any;
  public id: string;
  public showLoading = true;
  public _GetDeviceModel_sub: any;

  // 产品类型下拉
  public placeholder = '请选择产品类型';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:1, value:'OBD'},
    {ID:2, value:'SIM卡'},
    {ID:3, value:'潜伏者'}
  ];

  constructor(
    private fb: FormBuilder,
    private productNumberService: ProductNumberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {
    this.form = fb.group({
      'ID': 0,
      'Name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'DeviceModel': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'DeviceCategory': ['', Validators.required],
      'Description': ['', Validators.compose([Validators.minLength(2), Validators.maxLength(200)])],
      'DeviceSupplierIDs': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.checkAction();
  }


  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.GetDeviceModel({ DeviceModelId: params.id });
      } else {
        this.showLoading = false;
      }
    });
  }

  // 获取单个设备型号信息
  GetDeviceModel(data) {
    this._GetDeviceModel_sub = this.productNumberService.GetDeviceModel(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': this.id,
          'Name': res.Data.Name || '',
          'DeviceModel': res.Data.DeviceModel || '',
          'DeviceCategory': res.Data.DeviceCategory || '',
          'Description': res.Data.Description || '',
          'DeviceSupplierIDs': res.Data.DeviceSupplierIDs || ''
        });
        this.showLoading = false;
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

  // 添加产品型号
  AddDeviceModel(form) {
    this.productNumberService.AddDeviceModel(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 修改更新产品型号
  UpdateDeviceModel(form) {
    this.productNumberService.UpdateDeviceModel(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 判断是更新还是新增
  onSubmit(form) {
    this.showLoading = true;
    if (this.id) {
      this.UpdateDeviceModel(form);
    } else {
      this.AddDeviceModel(form);
    }
  }

  // 获取供应商ID
  getSupplierID(e) {
    this.form.controls['DeviceSupplierIDs'].setValue(e);
  }

  // 获取产品类型
  getDeviceCategory(e){
    this.form.controls['DeviceCategory'].setValue(e.ID);
  }


  // 取消
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }
  ngOnDestroy() {
    if(this.getId){
      this.getId.unsubscribe();
    }
    if (this._GetDeviceModel_sub) {
      this._GetDeviceModel_sub.unsubscribe();
    }
  }

}
