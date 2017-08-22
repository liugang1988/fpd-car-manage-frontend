import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute, UrlSegment } from '@angular/router';
import { Title } from '@angular/platform-browser';
import './rxjs-operators'; // 导入rxjs的一些操作符
import { EventsService } from './services/events-service.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { MitNotificationsService } from './widgets/mit-notifications/mit-notifications.service';
import { AppService } from './app.service';
import { RbacService } from './rbac/rbac.service';
import { environment } from '../environments/environment';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public toastOptions: Object = {
    position: ['bottom', 'right'],
    timeOut: 2500,
    lastOnBottom: true
  };

  public showLoadingBar = false;
  public getUserAllRights: any;
  constructor(
    private datepickerConfig: NgbDatepickerConfig,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private rbacService: RbacService,
    private notificationsService: MitNotificationsService,
    private eventsService: EventsService,
    private slimLoadingBarService: SlimLoadingBarService,
    private appService: AppService) {

    this.SetGlobalDatepickerConfig();

  }

  // 全局日历配置
  SetGlobalDatepickerConfig() {

    this.datepickerConfig.minDate = { year: 1900, month: 1, day: 1 };
  }

  // 获取用户菜单
  GetUserAllRights() {
    if (this.rbacService.isAuthenticated() && this.rbacService.isExpiresed()) {
      const data = { UserId: this.rbacService.getUserID() };
      this.getUserAllRights = this.appService.GetUserAllRights(data).subscribe((res) => {
        localStorage.setItem(environment.local_storage_menu, JSON.stringify(res.Data.MenuRights.SubLinks));
      });
    }
  }


  // 全局事件代理
  setGlobalProxy() {
    this.eventsService.getEmitter().subscribe((item) => {
      this.onEventHandler(item);
    });
  }


  // 设置文档标题
  setDocTitle() {
    let route: { firstChild: any, data: any } = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    };
    this.titleService.setTitle(route.data.value.title);
  }


  // 全局路由拦截
  routerEvent() {
    this.router.events.subscribe((event: Event) => {

      // 路由开始
      if (event instanceof NavigationStart) {
        this.slimLoadingBarService.start();
      }

      // 路由结束
      if (event instanceof NavigationEnd) {

        this.slimLoadingBarService.complete();
        this.setDocTitle();

      }

    });
  }

  ngOnInit() {
    // this.clearStorage();
    //当页面在注册,登录页,不请求菜单接口
    if(window.location.hash != '#/account/login' && window.location.hash != '#/account/collect'){
      this.GetUserAllRights();
    }
    this.routerEvent();
    this.setGlobalProxy();
  }


  // 全局事件代理
  onEventHandler(item: any) {
    switch (item.name) {
      case this.eventsService.eventNames.EVENT_TOAST_SUCCESS:
        this.notificationsService.success('成功提示', item.data);
        break;
      case this.eventsService.eventNames.EVENT_TOAST_ERROR:
        this.notificationsService.error('失败提示', item.data);
        break;
      default:
        break;
    }

  }


  clearStorage() {
    if (!localStorage.getItem(environment.local_remember_account)) {
      localStorage.clear();
    }
  }
  ngOnDestroy() {
    if (this.getUserAllRights) {
      this.getUserAllRights.unsubscribe();
    }
  }

}
