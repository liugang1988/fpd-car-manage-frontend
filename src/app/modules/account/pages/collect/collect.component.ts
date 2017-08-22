import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { EventsService } from '../../../../services/events-service.service';
import { Location } from '@angular/common';
import { flyIn } from '../../../../animation/flyIn';
@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
  animations: [flyIn]
})
export class CollectComponent implements OnInit {
  public form: FormGroup; // 表单对象
  public showLoading = false;
  public messageTips: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private account: AccountService,
    private eventsService: EventsService,
    private _location: Location) {
    this.form = fb.group({
      'CompanyName': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      'Contacts': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\\u4e00-\\u9fa5]{2,10}')])],
      'Phone': ['', Validators.compose([Validators.required, Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}')])],
      'Email': ['', Validators.pattern('[\\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+')],
      'VehicleCount': [0, Validators.pattern('[0-9]{1,7}')],
      'Province': ['', Validators.required],
      'City': ['', Validators.required]
    });
  }

  ngOnInit() {


  }
  selectAddress(e) {
    const str = e.split('/');
    this.form.controls['Province'].setValue(str[0]);
    this.form.controls['City'].setValue(str[1]);
  }
  onSubmit(e) {
    this.showLoading = true;
    e.value.VehicleCount = parseInt(e.value.VehicleCount, 10) || 0;
    this.account.collectUserInfo(e.value).subscribe((res) => {
      this.messageTips = 'success';
    }, (err) => {
      this.showLoading = false;
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    });

  }

  back() {
    this._location.back();
  }

}
