import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { PuchaseOrderService } from '../puchase-order.service';


// 管道
import { TransDatePipe } from '../../../../../widgets/mit-pipe/TransDate/trans-date.pipe';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit, OnDestroy {
  public form: FormGroup; // 表单对象
  public getId: any;
  public id: any;
  public orderid: string; // 订单ID
  public supplierID: number; // 供应商ID

  public getRenderData: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private puchaseOrderService: PuchaseOrderService
  ) {
    this.form = fb.group({
      'ID': 0,
      'DeviceSuppliersID': ['', Validators.required],
      'PurchaseDeviceModelID': ['', Validators.required],
      'PurchaseOrderNO': '',
      'DeviceCount': ['', Validators.compose([Validators.required, Validators.pattern('\\d+')])],
      'UnitMoney': ['', Validators.compose([Validators.required, Validators.pattern('\\d+(\\.?)\\d{0,8}')])],
      'OrdersPerson': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'PurchaseTime': ['', Validators.required],
      'Remarks': ''
    });
  }

  ngOnInit() {
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string, orderid: string }) => {
      if (params.id && params.orderid) {
        this.id = parseInt(params.id, 10);
        this.orderid = params.orderid;
        this.GetPurchaseOne({ PurchaseDetailID: this.id });
      }
    });
  }


  // 获取单个采购订单信息
  GetPurchaseOne(data) {
    this.getRenderData = this.puchaseOrderService.GetSinglePurchaseWithDetail(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': this.id,
          'DeviceSuppliersID': res.Data.DeviceSuppliersID || '',
          'PurchaseDeviceModelID': res.Data.PurchaseDeviceModelID || '',
          'PurchaseOrderNO': this.orderid || '',
          'DeviceCount': res.Data.DeviceCount || '',
          'UnitMoney': res.Data.UnitMoney || '',
          'OrdersPerson': res.Data.OrdersPerson || '',
          'PurchaseTime': new TransDatePipe().transform(res.Data.PurchaseTime) || '',
          'Remarks': res.Data.Remarks || ''
        });
      }
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
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
    this.form.controls['PurchaseDeviceModelID'].setValue(e);
  }


  // 判断是更新还是新增
  onSubmit(form) {
    form.PurchaseTime = new TransDatePipe().transform(form.PurchaseTime);
    form.DeviceCount = parseInt(form.DeviceCount, 10);
    if (this.id) {
      this.updatePurchaseOrder(form);
    } else {
      this.addPurchaseOrder(form);
    }
  }


  // 更新订单
  updatePurchaseOrder(form) {
    this.puchaseOrderService.UpdatePurchaseList(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 添加订单
  addPurchaseOrder(form) {
    this.puchaseOrderService.AddPurchaseList(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }



  // 取消且返回
  back() {
    if (this.id) {
      this.router.navigate(['../../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  ngOnDestroy() {
    if (this.getRenderData) {
      this.getRenderData.unsubscribe();
    }
    if (this.getId) {
      this.getId.unsubscribe();
    }
  }

}
