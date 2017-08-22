import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DriverManageService } from '../driver-manage.service';
import { EventsService } from '../../../../services/events-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public getId: any;
  public data: any;
  public id: string;

  public getRenderList: any;
  constructor(
    private driverManageService: DriverManageService, 
    private eventsService:EventsService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getDerviceId();
  }

  getDerviceId() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.getDetail({ DriverId: parseInt(params.id, 10) });
      }
    });
  }

  getDetail(data) {
    this.getRenderList = this.driverManageService.GetSingleDriver(data).subscribe((res) => {
      // this.showLoading = false;
      this.data = res.Data;
      const startDate = new Date(res.Data.FirstDriversLicense);
      const endDate = new Date();
      const df = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000));
      this.data.Driving = (df / 365).toFixed(2);
    },(err)=>{
      
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
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }

  }


}
