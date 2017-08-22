import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';
import { AppVersionManageService } from '../app-version-manage.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public getId: any;
  public id: number;

  public appVersionInfo: any; // 结果集

  public _GetSingleVersion_sub: any;
  constructor(
    private appVersionManageService: AppVersionManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.checkAction();
  }


  // 获取ID
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.GetSingleVersion({ ID: this.id });
      }
    });
  }

  // 获取单条版本信息
  GetSingleVersion(data) {
    this._GetSingleVersion_sub = this.appVersionManageService.SingleVersion(data).subscribe((res) => {
      if (res.State) {
        this.appVersionInfo = res.Data;
      }
    }, (err) => {
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
