import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkWithHref } from '@angular/router';


// 动画
import { fadeIn } from '../../../../animation/fadeIn';

// 服务
import { DriverRankService } from '../driver-rank.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public Time:any;
  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private driverRankService: DriverRankService
  ) { }

  ngOnInit() {
  }

  // 搜索
  search(){
    
  }

}
