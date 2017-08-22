import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { DeviceOutService } from '../device-out.service';
import { EventsService } from '../../../../../services/events-service.service';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public form: FormGroup; // 表单对象
  public file: FormData;  // 上传文件
  public showLoading: boolean;

  public OrderCode: any; // 订单号
  public _salesOrderList: any;  // 订单号列表
  public deviceOutInfor: any;  // 获取出货信息
  public _deviceOutInfor: any;  // 获取出货信息

  public Address: any; // 收货人地址
  public Receiver: any; // 收货人
  public ShippingMethods: any; // 发货方式
  public LogisticsCompany: any; // 快递公司
  public LogisticsNumber: any; // 快递单号
  public DownExcel = 'http://oo140vnvi.bkt.clouddn.com/%E8%AE%BE%E5%A4%87%E5%87%BA%E5%BA%93%E6%A8%A1%E6%9D%BF.xlsx'; // 设备模板地址

  // 订单号下拉参数
  public placeholder = '请选择订单号';
  public optionName = "SalesOrderNo";
  public optionList: Array<any>;
  // 发货方式
  public ShippingPlaceholder = '请选择发货方式';
  public ShippingOptionName = "value";
  public ShippingOptionList: Array<any> = [
    {ID:1, value: '我司直发'}
  ];
   // 物流公司
  public LogisticsCompanyPlaceholder = '请选择物流公司';
  public LogisticsCompanyOptionName = "DictionaryValue";
  public LogisticsCompanyOptionList: Array<any>;

  public _LogisticsCompanyOptionList: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deviceOutService: DeviceOutService,
    private eventsService: EventsService
    ) {
  }

  ngOnInit() {
    this.getSalesOrderList();
    this.getLogisticsCompanyList({Category:15});
  }

  // 选择订单号
  getSalesOrder(e) {
    this.OrderCode = e.SalesOrderNo;
    this.getDeviceOutInfor({ ID: e.ID });
  }
  // 获取发货方式
  getShippingMethods(e){
    this.ShippingMethods = e.ID;
  }
  // 获取物流公司
  getLogisticsCompany(e){
    this.LogisticsCompany = e.ID
  }

  // 获取物流公司列表
  getLogisticsCompanyList(data){
    this._LogisticsCompanyOptionList = this.deviceOutService.GetLogisticsCompany(data).subscribe((res) => {
      if (res.Data) {
        this.LogisticsCompanyOptionList = res.Data[15];
      }
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else{
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    })
  }

  // 获取订单号
  getSalesOrderList() {
    this._salesOrderList = this.deviceOutService.GetSalesOrderNoList().subscribe((res) => {
      if (res.Data) {
        this.optionList = res.Data;
      }
    }, (err) => {
      
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else{
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    })
  }

  // 获取出货信息
  getDeviceOutInfor(data) {
    this._deviceOutInfor = this.deviceOutService.GetDeviceDetail(data).subscribe((res) => {
      if (res.Data) {
        this.deviceOutInfor = res.Data;
        this.Address = this.deviceOutInfor.Address || '';
        this.Receiver = this.deviceOutInfor.Receiver || '';
        this.ShippingMethods = this.deviceOutInfor.ShippingMethods ? this.deviceOutInfor.ShippingMethods : 1;
        this.LogisticsCompany = '';
        this.LogisticsNumber = '';
      }
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else{
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    })
  }
  
  // 接收文件
  uploadHandle(e) {
    this.file = e;
  }
  
  // 保存设备出库
  saveHandler(file) {
    this.showLoading = true;
    this.deviceOutService.AddDeviceDelivery(file, this.OrderCode, this.Address, this.Receiver, this.ShippingMethods, this.LogisticsCompany, this.LogisticsNumber).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.showLoading = false;
      this.back();
    }, (err) => {
      this.showLoading = false;
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }
  
  // 返回
  back() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    if (this._LogisticsCompanyOptionList) {
      this._LogisticsCompanyOptionList.unsubscribe();
    }
    if (this._deviceOutInfor) {
      this._deviceOutInfor.unsubscribe();
    }
  }
}
