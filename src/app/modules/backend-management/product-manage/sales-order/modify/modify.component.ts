import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  public form: FormGroup;
  public id: string; // 销售订单 ID
  public getId: any; // 订阅
  public showLoading = true;
  public getSignData: any; // 单个订单数据

  // 获取客户下拉参数
  public placeholder = '请选择客户';
  public optionName = "OrganizationName";
  public optionList: Array<any>;
  public _getDeptTree_: any;  

  constructor(
    private fb: FormBuilder,
    private salesOrderService: SalesOrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService) {
    this.form = fb.group({
      'SalesOrderID': [''],
      'OID': ['', Validators.required],
      'Contacts': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'ContactPhone': ['', Validators.compose([Validators.required, Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}')])],
      'Address': ['', Validators.required],
      'SalesOrderPerson': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'DeviceSuppliersID': ['', Validators.required],
      'DeviceModelID': ['', Validators.required],
      'DeviceCount': ['', Validators.required],
      'DevicePrice': '',
      'Remark': ''
    });
  }

  ngOnInit() {
    this.getDepartmentList();
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.getSignSale({ SalesOrderID: params.id });
      } else {
        this.showLoading = false;
      }
    });
  }

  // 获取客户ID
  getOrganizationlID(e){
    this.form.controls['OID'].setValue(e.ID);
    this.form.controls['Contacts'].setValue(e.Contact);
    this.form.controls['ContactPhone'].setValue(e.ContactPhone);
    this.form.controls['Address'].setValue(e.OrganizationAddress);
  }

  // 获取客户列表
  getDepartmentList(){
    this._getDeptTree_ = this.salesOrderService.GetOrganizationList().subscribe((res) => {
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


  // 获取单个销售订单信息
  getSignSale(data) {
    this.getSignData = this.salesOrderService.SalesOrderDetail(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'SalesOrderID': res.Data.ID || '',
          'OID': res.Data.OID || '',
          'Contacts': res.Data.Contacts || '',
          'ContactPhone': res.Data.ContactPhone || '',
          'Address': res.Data.Address || '',
          'SalesOrderPerson': res.Data.SalesOrderPerson || '',
          'DeviceSuppliersID': res.Data.SupplierID || '',
          'DeviceModelID': res.Data.DeviceModelID || '',
          'DeviceCount': res.Data.DeviceCount || '',
          'DevicePrice': res.Data.DevicePrice || '',
          'Remark': res.Data.Remark || ''
        });
        this.showLoading = false;
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

  // 获取供应商ID
  getSupplierID(e) {
    this.form.controls['DeviceSuppliersID'].setValue(e);
  }

  // 获取产品型号ID
  getDeviceModelID(e) {
    this.form.controls['DeviceModelID'].setValue(e);
  }

  onSubmit(form) {
    if (this.id) {
      this.UpdateOrder(form);
    } else {
      this.AddOrder(form);
    }
  }

  AddOrder(data) {
    this.salesOrderService.AddSalesOrder(data).subscribe((res) => {
       // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    },(err) => {
       this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  UpdateOrder(data) {
    this.salesOrderService.UpdateSalesOrder(data).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

}
