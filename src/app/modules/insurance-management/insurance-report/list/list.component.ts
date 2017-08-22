import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { InsuranceReportService } from '../insurance-report.service';
import { EventsService } from '../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../animation/fadeIn';
import { bounceIn } from '../../../../animation/bounceIn';

// 表格基类
import { MitDataTableBase } from '../../../../widgets/mit-data-table/mit-data-table-base';
@Component( {
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ],
  animations: [ fadeIn,bounceIn ]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public KeyValue: any;
  public vehicleStyle: any;
  public _getList: any;

  // 状态下拉框
  public placeholder = '请选择车辆所属';
  public optionName = "value";
  public optionList: Array<any> = [
    {ID:1, value:'深圳租赁公司'},
    {ID:2, value:'深圳TOGO'}
  ];

  constructor( private eventsService: EventsService,
    private insuranceReportService: InsuranceReportService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) {
    super( router, activatedRoute );
  }

  ngOnInit() {
    
  }

  // 获取车辆所属
  getCarID(e){
    this.vehicleStyle = e.ID
  }

  search(KeyValue) {
    this.rows = [];
    this.query = {
      KeyValue: KeyValue,
      vehicleStyle: this.vehicleStyle,
      PageIndex: 1,
      PageSize: 10,
      IsSearchTotal: true
    };
    this.getList();
  }

  getList() {
    // this._getList = this.insuranceReportService.GetGuaranteeList(this.query).subscribe(
    //   (res) => {
    //     if (res.State) {
    //       this.rows.push({ pageNum: this.query.PageIndex, data: res.Data.CurrentData });
    //       if (this.query.IsSearchTotal) {
    //         this.totalCount = res.Data.TotalCount;
    //       }
    //       this.getLocalData();
    //     }
    //   },
    //   (err) => {
    //     if (err.State == 10 || err.State == 11 || err.State == 12) {
    //       this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    //       setTimeout(() => {
    //         this.router.navigate(['/account/login']);
    //       }, 2500)
    //     } else {
    //       this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
    //     }
    //   }
    // );
  }

  ngOnDestroy() {
    if(this._getList){
      this._getList.unsubscribe();
    }
  }
}
