import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { EventsService } from '../../../../services/events-service.service';
import { DriverManageService } from '../driver-manage.service';

// 管道
import { TransDatePipe } from '../../../../widgets/mit-pipe/TransDate/trans-date.pipe';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit, OnDestroy {
  public getId: any;
  public id: any;
  public showLoading = true;
  public form: FormGroup; // 表单对象
  public currentDate: Object;
  public getRenderData: any;
  // 驾驶证类型下拉框
  public placeholder = '请选择驾驶证类型';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:0, value:'A1'},
    {ID:1, value:'A2'},
    {ID:2, value:'A3'},
    {ID:3, value:'B1'},
    {ID:4, value:'B2'},
    {ID:5, value:'C1'},
    {ID:6, value:'C2'},
    {ID:7, value:'C3'},
    {ID:8, value:'C4'}
  ];
  constructor(private driverManageService: DriverManageService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private eventsService: EventsService, private route: ActivatedRoute) {

    this.form = fb.group({
      'ID': '',
      'WorkNumber': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\\u4e00-\\u9fa5\\d]{1,20}')])],
      'ODID': ['', Validators.required],
      'DriverName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'Sex': [1, Validators.required],
      'Birthdate': ['', Validators.required],
      'IDCard': ['', Validators.compose([Validators.required, Validators.pattern('([0-9]){17,17}[Xx0-9]{1,1}')])],
      'Birthplace': ['', Validators.required],
      'IDCardAddress': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(80)])],
      'Phone': ['', Validators.compose([Validators.required, Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}')])],
      'DriversLicenseType': [5, Validators.required],
      'DriversLicenseValid': '',
      'FirstDriversLicense': '',
      'InJob': [1, Validators.required],
      'JoinTime': '',
      'DriverPhoto': '',
      'IDCardAPhoto': '',
      'DriversLicenseAPhoto': ''
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
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.getDriver({ DriverId: this.id });
      } else {
        this.showLoading = false;
      }
    });
  }

  // 选择驾驶证类型
  getDriversLicenseType(e){
    this.form.controls['DriversLicenseType'].setValue(e.ID);
  }

  // 判断是更新还是新增
  onSubmit(form) {
    form.DriversLicenseValid = new TransDatePipe().transform(form.DriversLicenseValid);
    form.FirstDriversLicense = new TransDatePipe().transform(form.FirstDriversLicense);
    form.Birthdate = new TransDatePipe().transform(form.Birthdate);
    form.JoinTime = new TransDatePipe().transform(form.JoinTime);
    this.showLoading = true;
    if (this.id) {
      this.updateDriver(form);
    } else {
      this.addDriver(form);
    }
  }

  getDriver(data) {
    this.getRenderData = this.driverManageService.GetSingleDriver(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          ID: this.id,
          WorkNumber: res.Data.WorkNumber || '',
          ODID: res.Data.ODID || '',
          DriverName: res.Data.DriverName || '',
          Sex: res.Data.Sex || 0,
          IDCard: res.Data.IDCard || '',
          Birthdate: new TransDatePipe().transform(res.Data.Birthdate) || '',
          Birthplace: res.Data.Birthplace || '',
          IDCardAddress: res.Data.IDCardAddress || '',
          Phone: res.Data.Phone || '',
          DriversLicenseType: res.Data.DriversLicenseType,
          DriversLicenseValid: new TransDatePipe().transform(res.Data.DriversLicenseValid) || '',
          FirstDriversLicense: new TransDatePipe().transform(res.Data.FirstDriversLicense) || '',
          InJob: res.Data.InJob,
          JoinTime: new TransDatePipe().transform(res.Data.JoinTime) || '',
          DriverPhoto: res.Data.DriverPhoto || '',
          IDCardAPhoto: res.Data.IDCardAPhoto || '',
          DriversLicenseAPhoto: res.Data.DriversLicenseAPhoto || ''
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

  // 添加司机档案
  addDriver(data) {
    this.driverManageService.AddDriver(data).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 更新司机档案
  updateDriver(data) {
    this.driverManageService.UpdateDriver(data).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }


  uploadEvt(e, name) {
    this.form.controls[name].setValue(e);
  }


  // 选择部门
  selectDept(e) {
    this.form.controls['ODID'].setValue(e);
  }

  // 选择地址
  selectAddress(e) {
    this.form.controls['Birthplace'].setValue(e);
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
    if (this.getRenderData) {
      this.getRenderData.unsubscribe();
    }
    if (this.getId) {
      this.getId.unsubscribe();
    }
  }

}
