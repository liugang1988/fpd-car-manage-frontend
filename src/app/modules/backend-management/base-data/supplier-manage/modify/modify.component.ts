import { SupplierManageService } from '../supplier-manage.service';
import { environment } from '../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { EventsService } from '../../../../../services/events-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public form: FormGroup; // 表单对象
  public getId: any; // 获取ID
  public id: string; // id
  public showLoading = true;
  public userId: string; // 用户ID

  constructor(
    private fb: FormBuilder,
    private supplierManageService: SupplierManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {

    this.form = fb.group({
      'ID': '',
      'SuppliersName': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      'Abbreviation': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(6)])],
      'Contacts': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'SuppliersTelephone': ['', Validators.compose([Validators.required, Validators.pattern('(\\d{2,5}-|\\d{3}-)?(\\d{8}|\\d{7})')])],
      'SuppliersMobilePhone': ['', Validators.compose([Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}')])],
      'SuppliersEmail': ['', Validators.compose([Validators.required, Validators.pattern('[\\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+')])],
      'SuppliersAddress': '',
      'SuppliersIntroduction': '',
      'Certifications': ''
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
        this.GetSingleSupplier({ 'SupplierId': parseInt(params.id, 10) });
      } else {
        this.showLoading = false;
      }
    });
  }


  // 保存
  onSubmit(form) {
    this.showLoading = true;
    if (this.id) {
      this.UpdateSupplier(form);
    } else {
      form.ID = 0;
      this.AddSupplier(form);
    }
  }

  uploadEvt(e, name) {
    this.form.controls[name].setValue(e);
  }


  // 取消
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  // 获取单个供应商的信息
  GetSingleSupplier(data) {
    this.supplierManageService.GetSingleSupplier(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          ID: data.SupplierId,
          SuppliersName: res.Data.SuppliersName || '',
          Abbreviation: res.Data.Abbreviation || '',
          Contacts: res.Data.Contacts || '',
          Certifications: res.Data.Certifications || '',
          SuppliersTelephone: res.Data.SuppliersTelephone || '',
          SuppliersEmail: res.Data.SuppliersEmail || '',
          SuppliersAddress: res.Data.SuppliersAddress || '',
          SuppliersIntroduction: res.Data.SuppliersIntroduction || '',
          SuppliersMobilePhone: res.Data.SuppliersMobilePhone || ''
        });
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

  // 更新供应商自己的信息
  UpdateSupplier(form) {
    this.supplierManageService.UpdateSupplier(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });

  }


  // 新增供应商
  AddSupplier(form) {
    this.supplierManageService.AddSupplier(form).subscribe((res) => {
      // 发起事件代理广播并返回上一页
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }
}
