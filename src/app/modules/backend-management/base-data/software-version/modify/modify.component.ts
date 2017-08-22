import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { SoftwareVersionService } from '../software-version.service';
import { EventsService } from '../../../../../services/events-service.service';


// 管道
import { TransDatePipe } from '../../../../../widgets/mit-pipe/TransDate/trans-date.pipe';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public supplierID: number; // 供应商ID
  public form: FormGroup; // 表单对象
  public getId: any;
  public id: string;
  public showLoading = true;
  public _GetSingleFirmware: any;

  // 状态下拉
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:0, value:'禁用'},
    {ID:1, value:'启用'}
  ];

  // public
  constructor(
    private fb: FormBuilder,
    private softwareVersionService: SoftwareVersionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {
    this.form = fb.group({
      'ID': 0,
      'PurchaseDeviceModelID': ['', Validators.required],
      'DeviceSuppliersID': ['', Validators.required],
      'SoftName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      'VersionNumber': ['', Validators.required],
      'BinFileUrl': ['', Validators.required],
      'Status': [null, Validators.required],
      'PublishPerson': ['', Validators.required],
      'PublishDate': ['', Validators.required],
      'BinDescription': [''],
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
        this.GetSingleFirmware({ FirmwarmId: params.id });
      } else {
        this.showLoading = false;
      }
    });
  }

  // 获取单条版本信息
  GetSingleFirmware(data) {
   this._GetSingleFirmware =  this.softwareVersionService.GetSingleFirmware(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': this.id,
          'PurchaseDeviceModelID': res.Data.PurchaseDeviceModelID || '',
          'DeviceSuppliersID': res.Data.DeviceSupplierIDs || '',
          'SoftName': res.Data.SoftName || '',
          'VersionNumber': res.Data.VersionNumber || '',
          'BinFileUrl': res.Data.BinFileUrl || '',
          'Status': res.Data.Status,
          'BinDescription': res.Data.BinDescription || '',
          'PublishPerson': res.Data.PublishPerson || '',
          'PublishDate': new TransDatePipe().transform(res.Data.PublishDate) || '',
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
  AddFirmware(form) {
    this.showLoading = true;
    this.softwareVersionService.AddFirmware(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 修改更新产品型号
  UpdateFirmware(form) {
    this.showLoading = true;
    this.softwareVersionService.UpdateFirmware(form).subscribe((res) => {
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
    form.PublishDate = new TransDatePipe().transform(form.PublishDate);
    if (this.id) {
      this.UpdateFirmware(form);
    } else {
      this.AddFirmware(form);
    }
  }

  // 获取供应商ID
  getSupplierID(e) {
    this.form.controls['DeviceSuppliersID'].setValue(e);
  }

  // 获取设备型号ID
  getDeviceModelID(e) {
    this.form.controls['PurchaseDeviceModelID'].setValue(e);
  }

  // 获取状态
  getStatus(e){
    this.form.controls['Status'].setValue(e.ID);
  }


  // 取消
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  //销毁
  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
    if (this._GetSingleFirmware) {
      this._GetSingleFirmware.unsubscribe();
    }
  }

}
