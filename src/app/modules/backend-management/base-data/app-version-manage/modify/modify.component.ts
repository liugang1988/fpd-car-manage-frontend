import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { AppVersionManageService } from '../app-version-manage.service';
import { EventsService } from '../../../../../services/events-service.service';
import { fadeIn } from '../../../../../animation/fadeIn';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  animations: [fadeIn]
})
export class ModifyComponent implements OnInit, OnDestroy {
  public getId: any;
  public id: number;
  public form: FormGroup;

  public showLoading = true;

  public _GetSingleVersion_sub: any;

  // app状态下拉框
  public placeholder = '请选择状态';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:0, value:'禁用'},
    {ID:1, value:'启用'}
  ];

  // 平台下拉框
  public placeholder1 = '请选择平台';
  public optionName1 = "value";
  public optionList1: Array<any> = [
    {ID:1, value:'IOS'},
    {ID:2, value:'Android'}
  ];

  constructor(
    private fb: FormBuilder,
    private appVersionManageService: AppVersionManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {
    this.form = fb.group({
      'ID': 0,
      'AppName': ['', Validators.required],
      'PlatForm': [1, Validators.required],
      'Version': ['', Validators.required],
      'DownLoadLink': ['', Validators.required],
      'Enabled': [1, Validators.required],
      'Description': ['']
    });
  }

  ngOnInit() {
    this.checkAction();
  }

  // 选择平台
  getPlat(e) {
    this.form.controls['PlatForm'].setValue(e.ID);
  }

  // 选择状态
  getEnabled(e) {
    this.form.controls['Enabled'].setValue(e.ID);
  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.GetSingleVersion({ ID: this.id });
      } else {
        this.showLoading = false;
      }
    });
  }

  // 获取单条版本信息
  GetSingleVersion(data) {
    this._GetSingleVersion_sub = this.appVersionManageService.SingleVersion(data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': data.ID,
          'AppName': res.Data.AppName,
          'PlatForm': res.Data.PlatForm,
          'Version': res.Data.Version,
          'DownLoadLink': res.Data.DownLoadLink,
          'Enabled': res.Data.Enabled,
          'Description': res.Data.Description,
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



  // 新增版本
  addVersion(data) {
    this.appVersionManageService.AddVersion(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 更新版本
  UpdateVersion(data) {
    this.appVersionManageService.UpdateVersion(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
    });
  }

  // 判断是更新还是新增
  onSubmit(form) {
    this.showLoading = true;
    if (this.id) {
      this.UpdateVersion(form);
    } else {
      this.addVersion(form);
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
    if (this._GetSingleVersion_sub) {
      this._GetSingleVersion_sub.unsubscribe();
    }
  }

}
