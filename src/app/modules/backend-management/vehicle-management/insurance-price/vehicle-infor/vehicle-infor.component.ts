import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { InsurancePriceService } from '../insurance-price.service';
import { EventsService } from '../../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';

// 管道
import { TransDatePipe } from '../../../../../widgets/mit-pipe/TransDate/trans-date.pipe';

@Component({
  selector: 'app-vehicle-infor',
  templateUrl: './vehicle-infor.component.html',
  styleUrls: ['./vehicle-infor.component.scss'],
  animations: [fadeIn]
})
export class VehicleInforComponent implements OnInit, OnDestroy {
  public getId: any; // 获取ID
  public _vehicleInfor: any;

  public vehicleInfor: any = {  // 车辆信息
    Vid: '',
    Plate: '',
    VIN: '',
    EngineNumber: '',
    CompanyName: '',
    VehicleModelName: '',
    Displacement: '',
    RegistrationTime: '',
    OverloadPerson: 0,
    PurchaseAmount: 0,
    PurchaseDate: '',
    IsCompensate: 1,
    CompensateCount: 0,
    NoAccidentYears: 0
  };

  // 近一年出险
  public CountPlaceholder = '请选择次数';
  public CountOptionName = "DictionaryValue";
  public CountOptionList: Array<any>;
  // 连续未出险
  public NoAccidentPlaceholder = '请选择年数';
  public NoAccidentOptionName = "DictionaryValue";
  public NoAccidentOptionList: Array<any>;

  @Input() defaultVehicleObj: any;
  @Output() step = new EventEmitter();
  @Output() VehicleObj = new EventEmitter();
  constructor(
    private insurancePriceService: InsurancePriceService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkAction();
    this.getNearYearCompensateEnum();
    this.getContinueNoAccidentYears();

  }

  // 获取ID
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { Vid: string }) => {
      if (params.Vid) {
        this.vehicleInfor.Vid = params.Vid;
        if (this.defaultVehicleObj) {
          this.vehicleInfor = this.defaultVehicleObj;
        } else {
          this.getVehicleDetail({ Vid: parseInt(params.Vid, 10) });
        }
      }
    });
  }

  // 是否理赔
  check(elem) {
    if (this.vehicleInfor.IsCompensate != elem) {
      this.vehicleInfor.IsCompensate = !this.vehicleInfor.IsCompensate;
    }
    if (elem) {
      this.vehicleInfor.NoAccidentYears = 0;
    } else {
      this.vehicleInfor.CompensateCount = 0;
    }
  }

  // 获取出险次数
  getCountID(e) {
    this.vehicleInfor.CompensateCount = e.ID;
  }

  // 获取未出险年数
  getNoAccidentID(e) {
    this.vehicleInfor.NoAccidentYears = e.ID;
  }

  // 获取车辆信息
  getVehicleDetail(data) {
    this.insurancePriceService.GetVehicleDetail(data).subscribe((res) => {
      if (res.Data) {
        this.vehicleInfor.Plate = res.Data.Plate;
        this.vehicleInfor.VIN = res.Data.VIN;
        this.vehicleInfor.EngineNumber = res.Data.EngineNumber;
        this.vehicleInfor.CompanyName = res.Data.CompanyName;
        this.vehicleInfor.VehicleModelName = res.Data.VehicleModelName;
        this.vehicleInfor.Displacement = res.Data.Displacement;
        this.vehicleInfor.RegistrationTime = res.Data.RegistrationTime;
        this.vehicleInfor.OverloadPerson = res.Data.OverloadPerson;
        this.vehicleInfor.PurchaseAmount = res.Data.PurchaseAmount;
        this.vehicleInfor.PurchaseDate = new TransDatePipe().transform(res.Data.PurchaseDate);
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
    })
  }

  // 获取近一年出险次数
  getNearYearCompensateEnum() {
    this.insurancePriceService.NearYearCompensateEnum().subscribe((res) => {
      if (res.Data) {
        this.CountOptionList = res.Data;
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
    })
  }

  // 获取连续未出险年数
  getContinueNoAccidentYears() {
    this.insurancePriceService.ContinueNoAccidentYears().subscribe((res) => {
      if (res.Data) {
        this.NoAccidentOptionList = res.Data;
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
    })
  }

  // 下一步
  next() {
    this.step.emit(2);
    this.VehicleObj.emit(this.vehicleInfor);
  }

  // 销毁
  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
    if (this._vehicleInfor) {
      this._vehicleInfor.unsubscribe();
    }
  }
}
