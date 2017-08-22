import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { InsurancePriceService } from '../insurance-price.service';
import { EventsService } from '../../../../../services/events-service.service';

// 管道
import { TransDatePipe } from '../../../../../widgets/mit-pipe/TransDate/trans-date.pipe';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
import { bounceIn } from '../../../../../animation/bounceIn';

@Component({
  selector: 'app-price-result',
  templateUrl: './price-result.component.html',
  styleUrls: ['./price-result.component.scss'],
  animations: [fadeIn,bounceIn]
})
export class PriceResultComponent implements OnInit {
  @Input() defaultInsuranceProjectObj:any;  // 投保项目
  @Input() defaultVehicleObj:any; // 车辆信息
  @Output() step = new EventEmitter();

  public allObj:any = { // 合并对象
    VID: '',
    InsuranceCompayID:0,
    VehicleContent: {
      Vid:'',
      Plate: '',
      VIN: '',
      EngineNumber:'',
      CompanyName:'',
      VehicleModelName:'',
      Displacement:'',
      RegistrationTime:'',
      OverloadPerson:'',
      PurchaseAmount:'',
      PurchaseDate:''
    },
    IsCompensate: 0,
    CompensateCount:0,
    NoAccidentYears: '',
    InsuranceContent:[],
    Premium:0  // 保费总额
  };
  public type1:any =false;  // 商业险是否投保
  public type2:any =false;  // 交强险是否投保
  public showLoading:boolean = false;
  constructor(
    private insurancePriceService: InsurancePriceService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.totalInsure();
    this.allObj.VID = this.defaultVehicleObj.Vid;
    this.allObj.VehicleContent.Vid = this.defaultVehicleObj.Vid;
    this.allObj.VehicleContent.Plate = this.defaultVehicleObj.Plate;
    this.allObj.VehicleContent.VIN = this.defaultVehicleObj.VIN;
    this.allObj.VehicleContent.EngineNumber = this.defaultVehicleObj.EngineNumber;
    this.allObj.VehicleContent.CompanyName = this.defaultVehicleObj.CompanyName;
    this.allObj.VehicleContent.VehicleModelName = this.defaultVehicleObj.VehicleModelName;
    this.allObj.VehicleContent.Displacement = this.defaultVehicleObj.Displacement;
    this.allObj.VehicleContent.RegistrationTime = this.defaultVehicleObj.RegistrationTime;
    this.allObj.VehicleContent.OverloadPerson = this.defaultVehicleObj.OverloadPerson;
    this.allObj.VehicleContent.PurchaseAmount = this.defaultVehicleObj.PurchaseAmount;
    this.allObj.VehicleContent.PurchaseDate = new TransDatePipe().transform(this.defaultVehicleObj.PurchaseDate);
    this.allObj.IsCompensate = this.defaultVehicleObj.IsCompensate ? 1 : 0;
    this.allObj.CompensateCount = this.defaultVehicleObj.CompensateCount;
    this.allObj.NoAccidentYears = this.defaultVehicleObj.NoAccidentYears;
    for(let i=0;i<this.defaultInsuranceProjectObj.length; i++){
      this.allObj.InsuranceContent.push({
        ID: this.defaultInsuranceProjectObj[i].ID,
        InsuranceType: this.defaultInsuranceProjectObj[i].InsuranceType,
        InsuranceTypeName: this.defaultInsuranceProjectObj[i].InsuranceTypeName,
        Name: this.defaultInsuranceProjectObj[i].Name,
        IsIntenance: this.defaultInsuranceProjectObj[i].IsIntenance,
        IntenanceName: this.defaultInsuranceProjectObj[i].IntenanceName,
        Amount: this.defaultInsuranceProjectObj[i].Amount,
        NoDeductible: this.defaultInsuranceProjectObj[i].NoDeductible ? 1 : 0,
        NoDeductibleAmount: this.defaultInsuranceProjectObj[i].NoDeductibleAmount
      })
    }
  }

  // 修改保险
  changInsure(index){
    if(!parseFloat(this.allObj.InsuranceContent[index].Amount) || this.allObj.InsuranceContent[index].Amount == '' || this.allObj.InsuranceContent[index].Amount == null){
      this.allObj.InsuranceContent[index].Amount = 0;
      this.allObj.InsuranceContent[index].IsIntenance = 0;
      this.allObj.InsuranceContent[index].NoDeductible = 0;
      this.allObj.InsuranceContent[index].NoDeductibleAmount = 0;
    }else{
      if(this.allObj.InsuranceContent[index].Name == '交强险' || this.allObj.InsuranceContent[index].Name == '车船税'){
        this.allObj.InsuranceContent[index].NoDeductible = 0;
        this.allObj.InsuranceContent[index].NoDeductibleAmount = 0;
      }else{
        this.allObj.InsuranceContent[index].IsIntenance = 1;
        this.allObj.InsuranceContent[index].NoDeductible = 1;
        this.allObj.InsuranceContent[index].NoDeductibleAmount = this.defaultInsuranceProjectObj[index].NoDeductibleAmount;
      }      
    }
    this.totalInsure();
  }

  // 修改不计免赔
  changeNoDeductible(index){
    if(!parseFloat(this.allObj.InsuranceContent[index].NoDeductibleAmount) || this.allObj.InsuranceContent[index].NoDeductibleAmount == '' || this.allObj.InsuranceContent[index].NoDeductibleAmount == null){
      this.allObj.InsuranceContent[index].NoDeductible = 0;
      this.allObj.InsuranceContent[index].NoDeductibleAmount = 0;
    }else{
      this.allObj.InsuranceContent[index].NoDeductible = 1;
    }
    this.totalInsure();
  }

  // 保费总额
  totalInsure() {
    this.allObj.Premium = 0;
    for (let i = 0; i < this.defaultInsuranceProjectObj.length; i++) {
      this.allObj.Premium += parseFloat(this.defaultInsuranceProjectObj[i].Amount) + parseFloat(this.defaultInsuranceProjectObj[i].NoDeductibleAmount);
    }
    this.allObj.Premium = parseFloat(this.allObj.Premium.toFixed(2));
  }

  // 判断提交保险类型
  getInsuranceType(){
    for(let i=0, j=this.allObj.InsuranceContent.length; i<j; i++){
      if(this.allObj.InsuranceContent[i].InsuranceType == 1 && this.allObj.InsuranceContent[i].IsIntenance){
        this.type1 = true;
      }else if(this.allObj.InsuranceContent[i].InsuranceType == 2 && this.allObj.InsuranceContent[i].IsIntenance){
        this.type2 = true;
      }
    }
    if(this.type1 && !this.type2){
      this.allObj.InsuranceType = 1;
    }else if(!this.type1 && this.type2){
      this.allObj.InsuranceType = 2;
    }else if(this.type1 && this.type2){
      this.allObj.InsuranceType = 3;
    }else{
      this.allObj.InsuranceType = 0;
    }
  }

  // 提交
  submit(){
    if(!this.showLoading){
      this.showLoading = true;
      this.getInsuranceType();
      this.insurancePriceService.InsurancePricing(this.allObj).subscribe((res)=>{
        this.eventsService.emitMessageEvent(res.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.allObj = {};
        this.defaultInsuranceProjectObj = [];
        this.defaultVehicleObj = [];
        this.router.navigate(['page/backend-management/vehicle-management/vehicle-record-manage']);
        this.showLoading = false;
      },(err)=>{
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        this.showLoading = false;
        this.router.navigate(['page/backend-management/vehicle-management/vehicle-record-manage']);
      })
    }
    
  }

  up(){
    this.step.emit(2);
  }
}
