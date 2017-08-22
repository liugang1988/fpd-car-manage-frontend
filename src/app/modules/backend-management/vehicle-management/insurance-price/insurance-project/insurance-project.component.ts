import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { InsurancePriceService } from '../insurance-price.service';
import { EventsService } from '../../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';


@Component({
  selector: 'app-insurance-project',
  templateUrl: './insurance-project.component.html',
  styleUrls: ['./insurance-project.component.scss'],
  animations: [fadeIn, bounceIn]
})
export class InsuranceProjectComponent implements OnInit,OnDestroy {
  @Input() PurchaseAmount: any; // 购车金额
  @Input() Displacement: any;  // 排量
  @Input() OverloadPerson: any; // 荷载人数
  @Input() defaultInsuranceProjectObj: any;  // 默认保单项目
  @Output() step = new EventEmitter();
  @Output() InsuranceProjectObj = new EventEmitter();  // 保单项目

  public insuranceProjectList: any;  // 投保项目列表
  public total: any = 0;
  public _getInsuranceList:any;

  public insuranceArr = [];  // 保单数组

  public placeholder: any = '请选择是否投保';
  public optionName: any = 'Name';

  public isChooseStatus: boolean = true;
  constructor(
    private insurancePriceService: InsurancePriceService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getInsuranceList();
    
  }

  isChange() {
    if (this.insuranceArr && this.insuranceArr.length) {
      for (let i = 0, j = this.insuranceArr.length; i < j; i++) {
        if (this.insuranceArr[i].IsIntenance) {
          this.isChooseStatus = false;
          return;
        } 
        this.isChooseStatus = true;
      }
    }
  }

  // 获取保险
  getInsuranceId(e, index) {
    this.insuranceArr[index].IsIntenance = e.ID;
    this.insuranceArr[index].IntenanceName = e.Name;
    if (this.insuranceArr[index].Name == '交强险' && this.insuranceArr[index].IsIntenance) {
      this.insuranceArr[index + 1].IntenanceName = '投保';
      this.insuranceArr[index + 1].IsIntenance = 1;
    } else if (this.insuranceArr[index].Name == '交强险' && !this.insuranceArr[index].IsIntenance) {
      this.insuranceArr[index + 1].IntenanceName = '不投保';
      this.insuranceArr[index + 1].IsIntenance = 0;
      this.insuranceArr[index + 1].NoDeductibleName = '不投保';
      this.insuranceArr[index + 1].NoDeductible = 0;
    }
    this.totalInsure();
    this.isChange();
  }

  // 获取不计免赔
  check(index) {
    this.insuranceArr[index].NoDeductible = this.insuranceArr[index].NoDeductible ? 0 : 1;
    this.insuranceArr[index].NoDeductibleName = this.insuranceArr[index].NoDeductible ? '投保' : '不投保';
    this.totalInsure();
  }

  // 获取保费
  getInsure() {
    const carPrice = this.PurchaseAmount;
    const displacement = parseFloat(this.Displacement.split('L')[0]);
    const seating = parseInt(this.OverloadPerson);
    for (let i = 0; i < this.insuranceArr.length; i++) {
      // 投保保费
      if (this.insuranceArr[i].IsIntenance) {
        if (this.insuranceArr[i].Name == '车辆损失险') {
          this.insuranceArr[i].Amount = this.carLose(carPrice);
        }
        if (this.insuranceArr[i].Name == '第三者责任险') {
          this.insuranceArr[i].Amount = this.threeDuty(this.insuranceArr[i].IsIntenance);
        }
        if (this.insuranceArr[i].Name == '全车盗抢险') {
          this.insuranceArr[i].Amount = this.carSteal(carPrice);
        }
        if (this.insuranceArr[i].Name == '车上人员(司机)责任险') {
          this.insuranceArr[i].Amount = this.driverDuty();
        }
        if (this.insuranceArr[i].Name == '车上人员(乘客)责任险') {
          this.insuranceArr[i].Amount = this.passengerDuty(seating);
        }
        if (this.insuranceArr[i].Name == '玻璃单独破碎险') {
          this.insuranceArr[i].Amount = this.glassBroken(this.insuranceArr[i].IsIntenance, carPrice);
        }
        if (this.insuranceArr[i].Name == '车身划痕险') {
          this.insuranceArr[i].Amount = this.carScratch(this.insuranceArr[i].IsIntenance);
        }
        if (this.insuranceArr[i].Name == '自燃损失险') {
          this.insuranceArr[i].Amount = this.autoignition(carPrice);
        }
        if (this.insuranceArr[i].Name == '发动机涉水损失险') {
          this.insuranceArr[i].Amount = this.engineWade(carPrice);
        }
        if (this.insuranceArr[i].Name == '交强险') {
          this.insuranceArr[i].Amount = this.compulsoryInsurance(seating);
          this.insuranceArr[i + 1].Amount = this.carAndboat(displacement);
        }
      } else {
        this.insuranceArr[i].Amount = 0;
        if (this.insuranceArr[i].Name == '交强险') {
          this.insuranceArr[i + 1].Amount = 0;
        }
      }

      // 不计免赔保费
      if (this.insuranceArr[i].NoDeductible) {
        this.insuranceArr[i].NoDeductibleAmount = this.NoDeduction(this.insuranceArr[i].Name, this.insuranceArr[i].Amount);
      } else {
        this.insuranceArr[i].NoDeductibleAmount = 0
      }
    }
  }

  // 保费总额
  totalInsure() {
    this.getInsure();
    this.total = 0;
    for (let i = 0; i < this.insuranceArr.length; i++) {
      this.total += this.insuranceArr[i].Amount + this.insuranceArr[i].NoDeductibleAmount;
    }
    this.total = this.total.toFixed(2);
  }

  // 获取保险项目列表
  getInsuranceList() {
    this._getInsuranceList = this.insurancePriceService.GetUBICommonInsurance().subscribe((res) => {
      if (res.Data) {
        this.insuranceProjectList = res.Data;
        if (this.defaultInsuranceProjectObj) {
          this.insuranceArr = this.defaultInsuranceProjectObj;
          this.totalInsure();
        } else {
          for (let i = 0; i < res.Data.length; i++) {
            // 保单数据
            this.insuranceArr.push({
              ID: res.Data[i].ID, // 保险项目ID
              InsuranceType: res.Data[i].BelongType, // 保险类型
              InsuranceTypeName: res.Data[i].BelongTypeDesc, // 保险类型名称
              Name: res.Data[i].ItemName, // 保险名称
              IsIntenance: 0, // 是否投保
              IntenanceName: '不投保',  // 投保名称
              Amount: 0, // 保险金额
              NoDeductible: 0,  // 是否不计免赔
              NoDeductibleName: '不投保',
              NoDeductibleAmount: 0  // 不计免赔金额
            })
          }
        }
        this.isChange();
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

  // 保费算法
  carLose(carPrice) { // 车辆损失险
    return parseFloat((carPrice * 0.01206).toFixed(2));
  }

  threeDuty(coverage) { // 第三者责任险
    if (coverage == 1) {
      return 827;
    } else if (coverage == 2) { // 10万
      return 1164;
    } else if (coverage == 3) { // 20万
      return 1419;
    } else if (coverage == 4) { // 30万
      return 1893;
    } else if (coverage == 5) { // 100万
      return 2463;
    }
  }

  carSteal(carPrice) { // 全车盗抢险
    return parseFloat((carPrice * 0.007036).toFixed(2));
  }

  driverDuty() { //车上人员(司机)责任险 
    return 100;
  }

  passengerDuty(seating) { //车上人员(乘客)责任险 
    return 50 * (seating - 1);
  }

  glassBroken(coverage, carPrice) { // 玻璃单独破碎险
    if (coverage == 1) {
      return parseFloat((carPrice * 0.0016).toFixed(2));
    } else if (coverage == 2) {
      return parseFloat((carPrice * 0.0029).toFixed(2));
    }
  }

  carScratch(coverage) { // 车身划痕险
    if (coverage == 1) {
      return 400;
    } else if (coverage == 2) {
      return 570;
    } else if (coverage == 3) {
      return 760;
    } else if (coverage == 4) {
      return 1140;
    }
  }

  autoignition(carPrice) { // 自燃损失险
    return parseFloat((carPrice * 0.0012).toFixed(2));
  }

  engineWade(carPrice) { // 发动机涉水损失险
    return parseFloat((carPrice * 0.01206 * 0.0603).toFixed(2));
  }

  compulsoryInsurance(seating) { // 交强险
    if (seating < 6) {
      return 950;
    } else if (seating >= 6) {
      return 1100;
    }
  }

  carAndboat(displacement) { // 车船税
    if (displacement <= 1) {
      return 300;
    } else if (displacement > 1 && displacement <= 1.6) {
      return 420;
    } else if (displacement > 1.6 && displacement <= 2) {
      return 480;
    } else if (displacement > 2 && displacement <= 2.5) {
      return 900;
    } else if (displacement > 2.5 && displacement <= 3) {
      return 1920;
    } else if (displacement > 3 && displacement <= 4) {
      return 3480;
    } else if (displacement > 4) {
      return 5280;
    }
  }

  // 不计免赔保费算法
  NoDeduction(insuranceName, insurancePrice) {
    switch (insuranceName) {
      case '车辆损失险': // 车辆损失险
        return parseFloat((insurancePrice * 0.15).toFixed(2));
      case '第三者责任险': // 第三者责任险
        return parseFloat((insurancePrice * 0.15).toFixed(2));
      case '全车盗抢险': // 全车盗抢险
        return parseFloat((insurancePrice * 0.2).toFixed(2));
      case '车上人员(司机)责任险': // 车上人员(司机)责任险
        return parseFloat((insurancePrice * 0.15).toFixed(2));
      case '车上人员(乘客)责任险': // 车上人员(乘客)责任险
        return parseFloat((insurancePrice * 0.15).toFixed(2));
      case '玻璃单独破碎险': // 玻璃单独破碎险
        return parseFloat((insurancePrice * 1).toFixed(2));
      case '车身划痕险': // 车身划痕险
        return parseFloat((insurancePrice * 0.105).toFixed(2));
      case '自燃损失险': // 自燃损失险
        return parseFloat((insurancePrice * 0.2).toFixed(2));
      case '发动机涉水损失险': // 发动机涉水损失险
        return parseFloat((insurancePrice * 0.15).toFixed(2));
    }
  }

  // 下一步
  next() {
    this.step.emit(3);
    this.InsuranceProjectObj.emit(this.insuranceArr);
  };
  // 上一步
  up() {
    this.step.emit(1);
    this.InsuranceProjectObj.emit(this.insuranceArr);
  }

  ngOnDestroy() {
    if(this._getInsuranceList){
      this._getInsuranceList.unsubscribe();
    }
  }
}
