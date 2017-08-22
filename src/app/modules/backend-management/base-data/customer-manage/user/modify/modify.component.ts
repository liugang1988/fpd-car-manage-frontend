import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../../../services/events-service.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public form: FormGroup; // 表单对象
  public getOrganizationId: any;
  public showLoading = true;
  public getUserId: any;
  public OID: number;
  public UserId: number;
  public UserStatus: any; // 用户状态

  // 状态下拉框
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:0, value:'禁用'},
    {ID:1, value:'正常'}
  ];

  public isEmailorPhone: any = /([\w-\.]+@[\w-]+(\.[\w-]))|(^1[3,4,5,7,8,9]\d{9}$)/;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private eventsService: EventsService, private userService: UserService) {
    this.form = fb.group({
      'ID': 0,
      'AccountName': ['', Validators.compose([Validators.required, Validators.pattern(this.isEmailorPhone)])],
      'NickName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'RoleId': ['', Validators.required],
      'DeptId': ['', Validators.required],
      'UserPhone': ['', Validators.compose([Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}') || Validators.pattern('(\\d{2,5}-|\\d{3}-)?(\\d{8}|\\d{7})')])],
      'UserStatus': ['1'],
      'PassWord': ['', Validators.compose([Validators.required, Validators.pattern('\\w{8,12}')])],
      'ConfirmPassWord': ['', Validators.compose([Validators.required])],
    }, { validator: this.passwordMatch('PassWord', 'ConfirmPassWord') });
  }

  // 校验密码是否一致
  passwordMatch(PassWord, ConfirmPassWord) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[PassWord];
      const passwordConfirmationInput = group.controls[ConfirmPassWord];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      }
    };
  }

  // 获取状态
  getUserStatus(e){
    this.form.controls['UserStatus'].setValue(e.ID);
  }


  // 获取用户id
  GetUserID() {
    this.getUserId = this.activatedRoute.params.subscribe((params: { UserId: string }) => {
      if (params.UserId) {
        this.UserId = parseInt(params.UserId, 10);
        this.form.controls['PassWord'].setValidators(Validators.compose([Validators.pattern('\\w{6,12}')]));
        this.form.controls['ConfirmPassWord'].setValidators([]);
        this.GetUserInfo(this.UserId);
      } else {
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


  // 确认
  onSubmit(form) {
    this.showLoading = true;
    if (this.UserId) {
      this.UpadteUser(form);
    } else {
      this.AddUser(form);
    }
  }

  // 添加用户
  AddUser(form) {
    this.userService.AddUser(form).subscribe(
      (res) => {
        // 发起事件代理广播并返回上一页
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.back();
      },
      (err) => {
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        this.back();
      }
    );
  }

  // 更新用户信息
  UpadteUser(form) {
    this.userService.UpdateUser(form).subscribe(
      (res) => {
        // 发起事件代理广播并返回上一页
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.back();
      },
      (err) => {
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        this.back();
      }
    );
  }

  // 通过url获取当前组织id
  GetOrzID() {
    this.getOrganizationId = this.activatedRoute.parent.params.subscribe((params: { OrganizationId: string }) => {
      if (params.OrganizationId) {
        this.OID = parseInt(params.OrganizationId, 10);
      }
    });
  }


  // 获取用户信息
  GetUserInfo(UserId) {
    const data = { UserId: UserId };
    this.userService.GetUserInfo(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': UserId || 0,
          'AccountName': res.Data.AccountName || '',
          'NickName': res.Data.NickName || '',
          'RoleId': res.Data.RoleId || '',
          'DeptId': res.Data.DeptId || '',
          'UserPhone': res.Data.UserPhone || '',
          'UserStatus': res.Data.UserStatus,
          'PassWord': res.Data.PassWord || '',
          'ConfirmPassWord': res.Data.ConfirmPassWord || '',
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


  // 选择角色
  selectRole(e) {
    this.form.controls['RoleId'].setValue(e);
  }

  // 选择部门
  selectDept(e) {
    this.form.controls['DeptId'].setValue(e);
  }

  // 取消
  back() {
    if (this.UserId) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }


  ngOnInit() {
    this.GetOrzID();
    this.GetUserID();
  }
  // 销毁
  ngOnDestroy() {
    if (this.getOrganizationId) {
      this.getOrganizationId.unsubscribe();
    }
  }

}
