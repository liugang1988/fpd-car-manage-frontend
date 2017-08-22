import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../services/events-service.service';
import { RoleManageService } from '../role-manage.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public showLoading = true;
  public getId: any;
  public id: string;
  public form: FormGroup; // 表单对象
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private roleManageService: RoleManageService
  ) {
    this.form = fb.group({
      'ID': '',
      'RoleName': ['', [Validators.required, Validators.pattern('[a-zA-Z\\u4e00-\\u9fa5\\d]{2,12}')]],
      'RoleDesc': ['', [Validators.pattern('[a-zA-Z\\u4e00-\\u9fa5\\d]{2,}')]],
    });
  }


  // 根据是否存在id判断是新增还是修改还是查看详情
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { roleId: string }) => {
      if (params.roleId) {
        this.id = params.roleId;
        this.GetSingleRole({ 'RoleId': parseInt(params.roleId, 10) });
      } else {
        this.showLoading = false;
      }
    });
  }


  // 获取单个角色信息
  GetSingleRole(data) {
    this.roleManageService.GetSingleRole(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': parseInt(this.id, 10),
          'RoleName': res.Data.RoleName || '',
          'RoleDesc': res.Data.RoleDesc || ''
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



  // 更新角色
  UpdateRole(data) {
    this.roleManageService.UpdateRole(data).subscribe(
      (res) => {
        // 发起事件代理广播并返回上一页
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.back();
      },(err)=>{
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        this.back();
      }
    );
  }


  // 添加角色
  AddRole(data) {
    this.roleManageService.AddRole(data).subscribe(
      (res) => {
        // 发起事件代理广播并返回上一页
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.back();
      },(err)=>{
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        this.back();
      }
    );
  }


  // 确认
  onSubmit(data) {
    this.showLoading = true;
    if (this.id) {
      this.UpdateRole(data);
    } else {
      this.AddRole(data);
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

  ngOnInit() {
    this.checkAction();
  }

}
