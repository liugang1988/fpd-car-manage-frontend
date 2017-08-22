import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// 服务
import { EventsService } from '../../../../../services/events-service.service';
import { InsuranceProjectService } from '../insurance-project.service';
// 基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';
// 动画
import { fadeIn } from '../../../../../animation/fadeIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fadeIn]
})
export class ListComponent extends MitDataTableBase implements OnInit, OnDestroy {

  public getRenderList: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private insuranceProjectService: InsuranceProjectService
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  getList() {
    this.getRenderList = this.insuranceProjectService.InsuranceCompanyList(this.query).subscribe((res) => {
      if ( res.State ) {
        this.rows.push({ pageNumber: this.query.pageIndex, data: res.Data.CurrentData });
        if ( this.query.isSearchTotal ) {
          this.totalCount = res.Data.TotalCount;
        }
        this.getLocalData();
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

  updateStatus(id, status) {
    const data = {
      ID: id,
      status: status ? 1 : 0
    };
    this.insuranceProjectService.UpdateInsuranceCompanyStatus(data).subscribe((res) => {
      this.eventsService.emitMessageEvent( res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message );
    }, (err) => {
      this.eventsService.emitMessageEvent( err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message );
    });
  }

  modify(item): void {
    this.router.navigate(['./modify', item.ID], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy() {
    if ( this.getRenderList ) {
      this.getRenderList.unsubscribe();
    }
    this.rows = [];
    this.list = [];
  }

}
