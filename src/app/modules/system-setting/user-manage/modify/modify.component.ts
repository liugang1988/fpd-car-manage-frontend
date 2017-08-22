import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../services/events-service.service';
import { UserManageService } from '../user-manage.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit, OnDestroy {

  public showLoading = true;
  public getId: any;
  public id: number;
  public form: FormGroup; // 表单对象
  public isEmailorPhone: any = /([\w-\.]+@[\w-]+(\.[\w-]))|(^1[3,4,5,7,8,9]\d{9}$)/;
  public departmentName:any;
  public treeFalg = 1;  // 所属部门的树形数据级别s
  // 状态下拉框
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:1, value:'正常'},
    {ID:0, value:'禁用'}
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private userManageService: UserManageService
  ) {
    this.form = fb.group({
      'ID': 0,
      'AccountName': ['', Validators.compose([Validators.required, Validators.pattern(this.isEmailorPhone)])],
      'NickName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'RoleId': ['', Validators.required],
      'DeptId': ['', Validators.required],
      'UserPhone': ['', Validators.compose([Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}')])],
      'UserStatus': [1, Validators.required],
      'PassWord': ['', Validators.compose([Validators.required, Validators.pattern('\\w{8,12}')])],
      'ConfirmPassWord': ['', Validators.compose([Validators.required])],
    }, { validator: this.passwordMatch('PassWord', 'ConfirmPassWord') });
  }

  ngOnInit() {
    this.checkAction();
  }

  // 选择公司
  selectCompany(e){
    this.form.controls['DeptId'].setValue(e.length > 1 ? e[e.length -1] : -1);
  }

  // 获取状态
  getStatus(e){
    this.form.controls['UserStatus'].setValue(e.ID);
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

  // 根据是否存在id判断是新增还是修改还是查看详情
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { userId: string }) => {
      if (params.userId) {
        this.id = parseInt(params.userId, 10);
        this.form.controls['PassWord'].setValidators(Validators.compose([Validators.pattern('\\w{6,12}')]));
        this.form.controls['ConfirmPassWord'].setValidators([]);
        this.getUser({ 'UserId': parseInt(params.userId, 10) });
      } else {
        this.showLoading = false;
      }
    });
  }

  // 获取用户信息
  getUser(data) {
    this.userManageService.GetUserInfo(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': this.id,
          'AccountName': res.Data.AccountName,
          'NickName': res.Data.NickName,
          'DeptId': res.Data.DeptId,
          'RoleId': res.Data.RoleId,
          'UserPhone': res.Data.UserPhone,
          'UserStatus': res.Data.UserStatus,
          'PassWord': '',
          'ConfirmPassWord': ''
        });
        this.departmentName = res.Data.DepartmentName;
        this.showLoading = false;
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


  // 添加用户
  addUser(data) {
    this.userManageService.AddUser(data).subscribe(
      (res) => {
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.back();
      }, (err) => {
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        this.back();
      }
    );
  }

  // 添加用户
  UpdateUserInfo(data) {
    this.userManageService.UpdateUserInfo(data).subscribe(
      (res) => {
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.back();
      }, (err) => {
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        this.back();
      }
    );

  }

  // 选择角色
  selectRole(e) {
    this.form.controls['RoleId'].setValue(e);
  }

  // 确认
  onSubmit(data) {
    this.showLoading = true;
    if (this.id) {
      this.UpdateUserInfo(data);
    } else {
      this.addUser(data);
    }
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
  }


}
