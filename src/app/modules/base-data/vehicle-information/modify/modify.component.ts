import { Component, OnInit, Input, trigger, OnDestroy, keyframes } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 管道
import { TransDatePipe } from '../../../../widgets/mit-pipe/TransDate/trans-date.pipe';

// 服务
import { EventsService } from '../../../../services/events-service.service';
import { VehicleInformationService } from '../vehicle-information.service';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  animations: [fadeIn]
})
export class ModifyComponent implements OnInit, OnDestroy {
  public isMore = false;
  public form: FormGroup; // 表单对象
  public showLoading = true;
  public getId: any;
  public id: any;
  public imgUploadParam: any; // 图片上传参数
  public DisplacementUnit = 'L'; //  排量单位
  public DisplacementList: any; // 排量集合
  public currentDate: Object;
  public getRenderData: any;
  private isLicense = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1})([A-Z]{1})([A-Z0-9]{4,5})([A-Z0-9挂学警港澳]{1})$/; // 校验车牌

  constructor(
    private fb: FormBuilder,
    private vehicleInformationService: VehicleInformationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService) {
    this.form = fb.group({
      'Vid': 0,
      'BID': ['', Validators.required],
      'LID': ['', Validators.required],
      'MID': ['', Validators.required],
      'Plate': ['', Validators.compose([Validators.required, Validators.pattern(this.isLicense)])],
      'Displacement': ['', Validators.required],
      'Unit': ['L', Validators.required],
      'VIN': ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]{17,17}')])],
      'OverloadPerson': ['', Validators.compose([Validators.required, Validators.pattern('[1-9]{1,3}')])],
      'EngineNumber': ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]{3,20}')])],
      'ODID': ['', Validators.required],
      'RegistrationTime': ['', Validators.required],
      'RegistrationModel': [0],
      'Color': [0],
      'BrandName': [''],
      'LineName': [''],
      'VehicleModelName': [''],
      'Dealer': ['', Validators.compose([Validators.minLength(2), Validators.maxLength(10)])],
      'ATM': [0],
      'Owner': ['', Validators.compose([Validators.minLength(2), Validators.maxLength(10)])],
      'FuelType': [0],
      'RegistrationCertificate': ['', Validators.compose([Validators.minLength(2), Validators.maxLength(40)])],
      'OilFuelReference': [0, Validators.compose([Validators.pattern('[\\d+(\.?)\\d]{1,8}')])],
      'PurchaseAmount': [0, Validators.compose([Validators.pattern('[\\d+(\.?)\\d]{1,13}')])],
      'EmissionStandards': [0],
      'PurchaseDate': [null],
      'TireBrand': [0],
      'UserType': [0],
      'DrivingLicenseA': [''],
      'DrivingLicenseB': [''],
      'CrossPiece': [0],
      'TireSize': [0],
      'TireWidth': [0],
      'TireHeight': [0],
      'RegistrationImage': [''],
      'OilCost': 0,
      'CertificateImage': ''
    });
  }

  ngOnInit() {
    const today = new Date();
    this.currentDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      // console.log( params );
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.GetSingleVehicle({ Vid: this.id });
        // 轮胎品牌 = 1,排量 = 2,登记车型 = 3,
        // 使用性质 = 4,变速箱参数 = 5,档位 = 6,
        // 排放标准 = 7,燃油型号 = 8,轮胎尺寸 = 9,
        // 轮胎胎宽 = 10,轮胎胎高 = 11,油费承担 = 12,
        // 车辆颜色 = 13,产品型号支持功能 = 14
        // this.DictionaryList( { Categorys: '2, 3, 13, 5, 8, 7, 12, 1,9, 10, 11' });
      } else {
        this.showLoading = false;
      }
    });
  }


  // 获取单个车辆信息
  GetSingleVehicle(data) {
    this.getRenderData = this.vehicleInformationService.GetSingleVehicle(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'Vid': this.id,
          'BID': res.Data.BID || 0,
          'LID': res.Data.LID || 0,
          'MID': res.Data.MID || 0,
          'Plate': res.Data.Plate || '',
          'BrandName': res.Data.BrandName || '',
          'LineName': res.Data.LineName || '',
          'VehicleModelName': res.Data.VehicleModelName || '',
          'Displacement': res.Data.Displacement || 0,
          'Unit': res.Data.Unit || 'L',
          'Color': res.Data.Color || 0,
          'VIN': res.Data.VIN || '',
          'OverloadPerson': res.Data.OverloadPerson || 0,
          'EngineNumber': res.Data.EngineNumber || '',
          'Dealer': res.Data.Dealer || '',
          'RegistrationModel': res.Data.RegistrationModel || 0,
          'ODID': res.Data.ODID || 0,
          'ATM': res.Data.ATM || 0,
          'Owner': res.Data.Owner || '',
          'FuelType': res.Data.FuelType || 0,
          'RegistrationCertificate': res.Data.RegistrationCertificate || '',
          'OilFuelReference': res.Data.OilFuelReference || 0,
          'PurchaseAmount': res.Data.PurchaseAmount || 0,
          'EmissionStandards': res.Data.EmissionStandards || 0,
          'PurchaseDate': new TransDatePipe().transform(res.Data.PurchaseDate) || '',
          'RegistrationTime': new TransDatePipe().transform(res.Data.RegistrationTime) || '',
          'TireBrand': res.Data.TireBrand || 0,
          'UserType': res.Data.UserType || 0,
          'DrivingLicenseA': res.Data.DrivingLicenseA || '',
          'DrivingLicenseB': res.Data.DrivingLicenseB || '',
          'CrossPiece': res.Data.CrossPiece || 0,
          'TireSize': res.Data.TireSize || 0,
          'TireWidth': res.Data.TireWidth || 0,
          'TireHeight': res.Data.TireHeight || 0,
          'RegistrationImage': res.Data.RegistrationImage || '',
          'OilCost': res.Data.OilCost || 0,
          'CertificateImage': res.Data.CertificateImage || ''
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




  // 判断是更新还是新增
  onSubmit(form) {
    form.RegistrationTime = new TransDatePipe().transform(form.RegistrationTime);
    form.PurchaseDate = new TransDatePipe().transform(form.PurchaseDate);
    form.OverloadPerson = parseInt(form.OverloadPerson, 10);
    form.PurchaseAmount = Math.abs(form.PurchaseAmount);
    this.showLoading = true;
    if (this.id) {
      this.UpdateVehicle(form);
    } else {
      this.AddVehicle(form);
    }
  }


  AddVehicle(data) {
    this.vehicleInformationService.AddVehicle(data).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  UpdateVehicle(data) {
    this.vehicleInformationService.UpdateVehicle(data).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }


  // 上传图片
  uploadEvt(e, name) {
    this.form.controls[name].setValue(e);
  }

  // 选择部门
  selectDept(e) {
    console.log(e)
    this.form.controls['ODID'].setValue(e);
  }


  // 品牌车系
  selectVehicle(e) {
    this.form.controls['BID'].setValue(e.BID);
    this.form.controls['LID'].setValue(e.LID);
    this.form.controls['MID'].setValue(e.MID);
    // console.log( e );
  }

  // 获取排量
  selectPL(e) {
    // console.log( '排量' + e );
    this.form.controls['Displacement'].setValue(e[0].ID);
  }

  // 获取登记车型
  selectCX(e) {
    // console.log( '登记车型' + e );
    this.form.controls['RegistrationModel'].setValue(e[0].ID);
  }


  // 获取变速箱参数、档位
  selectBSX(e) {
    // console.log( '变速箱参数、档位' + e );
    this.form.controls['ATM'].setValue(e[0].ID);
    this.form.controls['CrossPiece'].setValue(e[1].ID);
  }

  // 获取排放标准
  selectPF(e) {
    // console.log('排放标准' + e );
    this.form.controls['EmissionStandards'].setValue(e[0].ID);
  }


  // 获取油费承担者
  selectYF(e) {
    // console.log( '油费承担者' + e );
    this.form.controls['OilCost'].setValue(e[0].ID);
  }

  // 获取轮胎品牌
  selectLT(e) {
    // console.log( '轮胎品牌' + e );
    this.form.controls['TireBrand'].setValue(e[0].ID);
    this.form.controls['TireSize'].setValue(e[1].ID);
    this.form.controls['TireWidth'].setValue(e[2].ID);
    this.form.controls['TireHeight'].setValue(e[3].ID);

  }

  // 获取燃油种类型号
  selectRYXH(e) {
    // console.log( '燃油种类型号' + e );
    this.form.controls['FuelType'].setValue(e[0].ID);

  }

  // 获取使用性质
  selectUseType(e) {
    // console.log( '使用性质' + e );
    this.form.controls['UserType'].setValue(e[0].ID);
  }

  // 获取车辆颜色
  selectCarColor(e) {
    console.log('车辆颜色' + e);
    this.form.controls['Color'].setValue(e[0].ID);
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
    if (this.getId) {
      this.getId.unsubscribe();
    }
    if (this.getRenderData) {
      this.getRenderData.unsubscribe();
    }
  }

}
