import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { EventsService } from '../../../../../../services/events-service.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public showLoading = true;
  public form: FormGroup; // 表单对象
  public getId: any;
  public id: string;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {
    this.form = fb.group({
      'ID': '',
      'OrganizationName': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      'OrganizationShorterName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(6)])],
      'OrganizationPhone': ['', Validators.compose([Validators.pattern('(\\d{2,5}-|\\d{3}-)?(\\d{8}|\\d{7})')])],
      'Contact': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'ContactPhone': ['', Validators.compose([Validators.required, Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}')])],
      'OrganizationEmail': ['', Validators.compose([Validators.required, Validators.pattern('[\\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+')])],
      'OrganizationAddress': ['', Validators.maxLength(100)],
      'OrganizationDesc': ['', Validators.maxLength(300)]
    });
  }

  ngOnInit() {
    this.checkAction();
  }


  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.GetSingleOrganization({ ID: params.id });

      } else {
        this.showLoading = false;
      }
    });
  }

  // 判断是更新还是新增
  onSubmit(form) {
    if (this.id) {
      this.UpdateOrganization(form);
    } else {
      this.AddOrganization(form);
    }
  }



  // 获取单个部门信息
  GetSingleOrganization(data) {
    this.customerService.GetSingleOrganization(data).subscribe((res) => {
      if (res.State) {
        this.form.controls['ID'].setValue(res.Data.ID);
        this.form.controls['OrganizationName'].setValue(res.Data.OrganizationName || '');
        this.form.controls['OrganizationShorterName'].setValue(res.Data.OrganizationShorterName || '');
        this.form.controls['OrganizationPhone'].setValue(res.Data.OrganizationPhone || '');
        this.form.controls['Contact'].setValue(res.Data.Contact || '');
        this.form.controls['ContactPhone'].setValue(res.Data.ContactPhone || '');
        this.form.controls['OrganizationEmail'].setValue(res.Data.OrganizationEmail || '');
        this.form.controls['OrganizationAddress'].setValue(res.Data.OrganizationAddress || '');
        this.form.controls['OrganizationDesc'].setValue(res.Data.OrganizationDesc || '');
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

  // 修改部门
  UpdateOrganization(form) {
    this.showLoading = true;
    this.customerService.UpdateOrganizationDept(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 新增部门
  AddOrganization(form) {
    this.showLoading = true;
    this.customerService.AddOrganization(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();

    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
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
