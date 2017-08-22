import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 服务
import { HomeOverviewService } from './home-overview.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.scss']
})
export class HomeOverviewComponent implements OnInit {
  public homeOverviewInfo: any = {
    AllVehicleCount: 0,
    RunVehicleCount: 0,
    StopVehicleCount: 0,
    OfflineVehicleCount: 0
  }; // 需要渲染的数据集合
  constructor(
    private homeOverviewService: HomeOverviewService,
    private router: Router,
    private eventsService: EventsService) { }

  ngOnInit() {
    this.getHomeOverviewInfo();
  }


  getHomeOverviewInfo() {
    this.homeOverviewService.HomePageVehicle().subscribe((res) => {
      this.homeOverviewInfo = res.Data;
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
}
