import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { InsuranceCompanyService } from '../insurance-company.service';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit, OnDestroy {

  public getId: any;
  public id: number;
  public form: FormGroup;
  public showLoading: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private insuranceCompanyService: InsuranceCompanyService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      companyName: ['', Validators.compose([Validators.required])],
      companyType: ['', Validators.compose([Validators.required])],
      linkMan: ['', Validators.compose([Validators.required])],
      linkPhone: ['', Validators.compose([Validators.required])],
      workPhone: ['', Validators.compose([Validators.required])],
      remark: ''
    });
  }

  ngOnInit() {
    this.checkAction();
  }

  // 判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { ID: string }) => {
      if (params.ID) {
        this.id = parseInt(params.ID);
        this.getCompanyInfo({ ID: this.id });
      } else {
        this.showLoading = false;
      }
    });
  }

  // 获取保险公司信息
  getCompanyInfo(data) {
    this.insuranceCompanyService.DetailInsuranceCompanyInfo(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          companyName: res.Data.companyName || '',
          companyType: res.Data.companyType || '',
          linkMan: res.Data.linkMan || '',
          linkPhone: res.Data.linkPhone || '',
          workPhone: res.Data.workPhone || '',
          remark: res.Data.remark || ''
        });
      }
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }

  onSubmit(form) {
    if (this.id) {
      this.updateCompanyInfo(form);
    } else {
      this.addCompanyInfo(form);
    }
  }

  // 修改
  updateCompanyInfo(form) {
    this.showLoading = true;
    this.insuranceCompanyService.UpdateInsuranceCompanyInfo(form).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 新增
  addCompanyInfo(form) {
    this.showLoading = true;
    this.insuranceCompanyService.AddInsuranceCompanyInfo(form).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 返回
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  // 销毁
  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
  }

}
