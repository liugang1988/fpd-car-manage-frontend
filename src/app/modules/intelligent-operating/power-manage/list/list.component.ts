import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { PowerManageService } from '../power-manage.service';
import { EventsService } from '../../../../services/events-service.service';

// 基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { flyIn } from '../../../../animation/flyIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn, flyIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {



  constructor(
    private powerManageService: PowerManageService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {

  }


  // 查询
  search(KeyWords, ProcessingStatus, AlertsFilter) {
    this.rows = [];
    this.query = {
      KeyWords: KeyWords ? KeyWords.trim() : '',
      ProcessingStatus: parseInt(ProcessingStatus, 10) || parseInt(ProcessingStatus, 10) === 0 ? parseInt(ProcessingStatus, 10) : -1,
      AlertsFilter: AlertsFilter,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
  }

  // 获取从警报列表进来的参数
  getAlertParam() {
    this.activatedRoute.queryParams.subscribe(
      (res: { AlertType: string }) => {
        this.rows = [];
        this.query = {
          KeyWords: '',
          ProcessingStatus: 0,
          AlertsFilter: res.AlertType,
          PageIndex: 1,
          PageSize: 10,
          IsSearchTotal: true
        };
        this.getList();
      },
      (err) => {
        
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
      }
    );
  }

  // 获取所有数据
  getList() {

  }




  // 销毁
  ngOnDestroy() {

    this.rows = [];
    this.list = [];
  }

}
