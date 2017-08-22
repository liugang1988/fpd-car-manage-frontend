import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { DeviceInService } from '../device-in.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public form: FormGroup; // 表单对象
  public file: FormData;
  public showLoading = false;
  public getId: any;
  public paramType: any;  // 产品类型
  public PurchaseOrderNO: any; // 订单ID
  //public PuchaseSeriesNumber: string; // 订单序列号
  public _PurchaseOrderNoList: any;
  public _GetStorageInfo:any;

  // 状态下拉
  public placeholder = '请选择订单号';
  public optionName = "PurchaseOrderNO";
  public optionList: Array<any>;

  public orderInfo; // 订单的相关信息
  public PurchaseOrderList: any; // 采购订单列表/订单号列表
  public SupplierId: any; // 供应商ID
  public DeviceModelId: any; // 设备型号ID
  public DownExcel: string; // 下载excel
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deviceInService: DeviceInService,
    private eventsService: EventsService,
    private fb: FormBuilder
  ) {
  }



  ngOnInit() {
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { type: string }) => {
      if (params.type) {
        this.paramType = params.type;
        if (this.paramType === 'sim') {
          this.DownExcel = 'http://oo140vnvi.bkt.clouddn.com/SIM%E5%8D%A1%E5%85%A5%E5%BA%93.xlsx';
          this.PurchaseOrderNoList({ DeviceCategory: 2 });
        }
        if (this.paramType === 'obd') {
          this.DownExcel = 'http://oo140vnvi.bkt.clouddn.com/%E7%A1%AC%E4%BB%B6%E8%AE%BE%E5%A4%87.xlsx';
          this.PurchaseOrderNoList({ DeviceCategory: 1 });
        }


      }
    });
  }

  // 订单号选择改版请求相关的订单详情
  getOrderDetail(e) {
    this.PurchaseOrderNO = e.PurchaseOrderNO;
    this.GetStorageInfo(e);
  }



  // 获取采购订单号列表
  PurchaseOrderNoList(data) {
    this._PurchaseOrderNoList = this.deviceInService.PurchaseOrderNoList(data).subscribe((res) => {
      if (res.State) {
        this.optionList = res.Data;
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

  // 根据采购订单号获取相应订单详情 供设备入库导入详情使用
  GetStorageInfo(e) {
    this._GetStorageInfo = this.deviceInService.GetStorageInfo({PurchaseOrderNO: parseInt(e.ID, 10)}).subscribe((res) => {
      if (res.State) {
        this.orderInfo = res.Data;
        this.SupplierId = res.Data.DeviceSuppliersID;
        this.DeviceModelId = res.Data.PurchaseDeviceModelID;
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

  // 接收文件
  uploadHandle(e) {
    this.file = e;
  }
  // 设备Excel导入保存
  saveHandler(file) {
    this.showLoading = true;

    if (this.paramType === 'sim') {
      this.deviceInService.AddSimExcel(file, this.PurchaseOrderNO, this.SupplierId, this.DeviceModelId).subscribe((res) => {
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.showLoading = false;
        this.back();
      }, (err) => {
        this.showLoading = false;
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      });
    }
    if (this.paramType === 'obd') {
      this.deviceInService.AddStorageExcel(file, this.PurchaseOrderNO, this.SupplierId, this.DeviceModelId).subscribe((res) => {
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.showLoading = false;
        this.back();
      }, (err) => {
        this.showLoading = false;
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      });
    }

  }




  // 取消且返回
  back() {
    if (this.paramType) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  // 销毁
  ngOnDestroy() {
    if (this._PurchaseOrderNoList) { 
      this._PurchaseOrderNoList.unsubscribe();
    }
    if(this._GetStorageInfo){
      this._GetStorageInfo.unsubscribe();
    }

  }
}
