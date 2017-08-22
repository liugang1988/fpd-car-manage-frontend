import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { EventsService } from '../../../../services/events-service.service';
import { environment } from '../../../../../environments/environment';
import { flyIn } from '../../../../animation/flyIn';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [flyIn]
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup; // 表单对象
  public showLoading = false;
  public messageTips: string;
  public ClientModel: any;  // 浏览器版本
  public ClientVersion: any; // 操作系统

  public login_subscribe: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventsService: EventsService,
    private account: AccountService) {
    this.form = fb.group({
      'UserName': ['', Validators.compose([Validators.minLength(6) || Validators.pattern('(0|86|17951)?(-)?1[3,4,5,7,8,9]\\d{9}') || Validators.pattern('[\\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+')])],
      'PassWord': ['', Validators.compose([Validators.required, Validators.pattern('\\w{8,16}')])],
      'rememberAccount': [''],
      'ClientModel': [''],
      'ClientVersion': [''],
      'Ip': ['']
    });
  }


  ngOnInit() {
    this.getUserAgent();
    this.getIp();
  }

  // 获取ip
  getIp(){
    this.account.getIpAddr().subscribe((res)=>{
      this.form.controls['Ip'].setValue(res.ip);
    }, (err)=>{
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    })
  }

  // 获取浏览器版本号
  getUserAgent() {
    const agent = navigator.userAgent.toLowerCase();
    const regStr_ie = /msie [\d]+;/gi;
    const regStr_ff = /firefox\/[\d]+/gi
    const regStr_chrome = /chrome\/[\d]+/gi;
    const regStr_saf = /safari\/[\d]+/gi;
    const resStr_edge = /edge\/[\d]+/gi;
    const resStr_trident = /trident\/[\d]+/gi;
    const resStr_QQ = /qqbrowser\/[\d]+/gi;
    const resStr_BaiDu = /bidubrowser[\s\/]\/[\d]+/gi;
    const resStr_UC = /ubrowser\/[\d]+/gi;

    const resStr_windows = /windows nt [\d.]+/gi;
    const resStr_Mac = /version\/[\d.]+/gi

    //IE
    if (agent.indexOf("msie") > -1) {
      this.ClientModel = (agent.match(regStr_ie))[0];
    }

    //IE trident
    if (agent.indexOf("trident") > -1) {
      this.ClientModel = (agent.match(resStr_trident))[0];
    }
    //IE Edge
    if (agent.indexOf("edge") > -1) {
      this.ClientModel = (agent.match(resStr_edge))[0];
    }

    //firefox
    if (agent.indexOf("firefox") > -1) {
      this.ClientModel = (agent.match(regStr_ff))[0];
    }

    //Chrome
    if (agent.indexOf("chrome") > -1) {
      this.ClientModel = (agent.match(regStr_chrome))[0];
    }

    //Safari
    if (agent.indexOf("safari") > -1 && agent.indexOf("chrome") < -1) {
      this.ClientModel = (agent.match(regStr_saf))[0];
    }

    // QQ
    if (agent.indexOf("qqbrowser") > -1) {
      this.ClientModel = (agent.match(resStr_QQ))[0];
    }

    // baidu
    if (agent.indexOf("bidubrowser") > -1) {
      this.ClientModel = (agent.match(resStr_BaiDu))[0];
    }

    // UC
    if (agent.indexOf("ubrowser") > -1) {
      this.ClientModel = (agent.match(resStr_UC))[0];
    }

    this.form.controls['ClientModel'].setValue(this.ClientModel);

    // windows
    if (agent.indexOf("windows") > -1) {
      const winName = (agent.match(resStr_windows))[0];
      this.ClientVersion = winName.slice(0, 8) + this.winOSVersion(winName.slice(8));
    }

    // mac
    if (agent.indexOf("macintosh") > -1) {
      const version = (agent.match(resStr_Mac))[0];
      this.ClientVersion = 'Mac OS' + version;
    }

    this.form.controls['ClientVersion'].setValue(this.ClientVersion);
  }

  // 判断windows系统的版本
  winOSVersion(str) {
    switch (str) {
      case 'nt 5.1':
        return 'XP';
      case 'nt 5.2':
        return 'XP';
      case 'nt 6.0':
        return 'Vista';
      case 'nt 6.1':
        return '7';
      case 'nt 6.2':
        return '8';
      case 'nt 6.3':
        return '8.1';
      case 'nt 6.4':
        return '10';
      case 'nt 10.0':
        return '10';
      case 'arm':
        return 'RT';
    }
  }

  // 登录事件
  onSubmit(e) {
    this.showLoading = true;
    this.login_subscribe = this.account.login(e.value).subscribe((res) => {
      if (res.State === 1) {
        // 判断是否有菜单
        if (res.Data.UserRights.MenuRights.SubLinks !== null || (res.Data.UserRights.MenuRights.SubLinks && res.Data.UserRights.MenuRights.SubLinks.length)) {
          localStorage.setItem(environment.local_storage_account, JSON.stringify(res.Data));
          localStorage.setItem(environment.local_storage_menu, JSON.stringify(res.Data.UserRights.MenuRights.SubLinks));
          this.router.navigate([res.Data.UserRights.MenuRights.SubLinks[0].Url]);
        } else {
          this.showLoading = false;
          this.messageTips = '该用户没有正确的配置菜单，请联系管理员解决!';
        }

        // 是否需要记住账号
        localStorage.setItem(environment.local_remember_account, e.value.rememberAccount);

      } else {
        this.showLoading = false;
        this.messageTips = res.Message;
      }
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

  ngOnDestroy() {
    if (this.login_subscribe) {
      this.login_subscribe.unsubscribe();
    }
  }

}
