import { environment } from '../../../../../environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { PersonalCenterService } from './personal-center.service';
import { EventsService } from '../../../../services/events-service.service';
import { bounceIn } from '../../../../animation/bounceIn';
@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.scss'],
  animations: [bounceIn]

})
export class PersonalCenterComponent implements OnInit, OnDestroy {
  public showLoading = true;
  public userId: string;  // 用户ID
  public localStorageBaseUserInfo: any = JSON.parse(localStorage.getItem(environment.local_storage_account)).CurUserInfo; // 本地缓存的基础用户数据
  public basicForm: FormGroup; // 表单对象
  public changePasswordForm: FormGroup; // 修改密码的表单对象

  public _getUserBasicInfo_: any;
  constructor(
    private fb: FormBuilder,
    private personalCenterService: PersonalCenterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {
    this.basicForm = fb.group({
      'ID': '',
      'AccountName': '',
      'DepartmentName': '',
      'RoleName': '',
      'NickName': ['', Validators.compose([Validators.minLength(2), Validators.maxLength(10)])],
      'UserPhone': ['', Validators.compose([Validators.required, Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}')])],
      'UserEmail': ['', Validators.compose([Validators.required, Validators.pattern('[\\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+')])],
    });

    this.changePasswordForm = fb.group({
      'ID': '',
      'OldPassWord': '',
      'PassWord': ['', Validators.compose([Validators.required, Validators.pattern('\\w{8,16}')])],
      'ConfirmPassWord': ['', Validators.compose([Validators.required, Validators.pattern('\\w{8,16}')])],
    });

  }
  ngOnInit() {
    this.getUserBasicInfo();
  }


  getUserBasicInfo() {
    this.basicForm.get('AccountName').disable();
    this.basicForm.get('DepartmentName').disable();
    this.basicForm.get('RoleName').disable();
    const data = { UserId: JSON.parse(localStorage.getItem(environment.local_storage_account)).CurUserInfo.UserId };
    this._getUserBasicInfo_ = this.personalCenterService.GetUserBasicInfo(data).subscribe((res) => {
      this.changePasswordForm.controls['ID'].setValue(res.Data.ID);
      this.basicForm.setValue({
        ID: res.Data.ID || '',
        AccountName: res.Data.AccountName || '',
        DepartmentName: res.Data.DepartmentName || '',
        RoleName: res.Data.RoleName || '',
        NickName: res.Data.NickName || '',
        UserPhone: res.Data.UserPhone || '',
        UserEmail: res.Data.UserEmail || ''
      });
      this.showLoading = false;
    });
  }

  // 更新基本信息
  onUpdateBaseInfo(form) {
    this.showLoading = true;
    this.UpdateUserBasicInfo(form);
  }

  UpdateUserBasicInfo(data) {
    this.personalCenterService.UpdateUserBasicInfo(data).subscribe((res) => {
      // 发起事件代理广播
      this.getUserBasicInfo();
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
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

  ModifyUserPassword(data) {
    this.personalCenterService.ModifyUserPassword(data).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      setTimeout(() => {
        if (res.State) {
          localStorage.removeItem(environment.local_storage_account);
          this.router.navigateByUrl('/account');
        }
      }, 1500);

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


  // 更改密码
  onChangePass(form) {
    this.ModifyUserPassword(form);
  }

  ngOnDestroy() {
    if (this._getUserBasicInfo_) {
      this._getUserBasicInfo_.unsubscribe();
    }
  }

}
